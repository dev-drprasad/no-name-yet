const monacoTextmate1 = require("monaco-textmate");

class TokenizerState {
  constructor(_ruleStack) {
    this._ruleStack = _ruleStack;
  }
  get ruleStack() {
    return this._ruleStack;
  }
  clone() {
    return new TokenizerState(this._ruleStack);
  }
  equals(other) {
    if (
      !other ||
      !(other instanceof TokenizerState) ||
      other !== this ||
      other._ruleStack !== this._ruleStack
    ) {
      return false;
    }
    return true;
  }
}

/**
 * Wires up monaco-editor with monaco-textmate
 *
 * @param monaco monaco namespace this operation should apply to (usually the `monaco` global unless you have some other setup)
 * @param registry TmGrammar `Registry` this wiring should rely on to provide the grammars
 * @param languages `Map` of language ids (string) to TM names (string)
 */
export function wireTmGrammars(monaco, registry, languages, scopeMap) {
  return Promise.all(
    Array.from(languages.keys()).map(async languageId => {
      try {
        const grammar = await registry.loadGrammar(languages.get(languageId));

        monaco.languages.setTokensProvider(languageId, {
          getInitialState: () => new TokenizerState(monacoTextmate1.INITIAL),
          tokenize: (line, state) => {
            const res = grammar.tokenizeLine(line, state.ruleStack);

            console.log("res.tokens :", res.tokens);
            return {
              endState: new TokenizerState(res.ruleStack),
              tokens: res.tokens.map(token => ({
                ...token,
                // TODO: At the moment, monaco-editor doesn't seem to accept array of scopes
                scopes: getScope(scopeMap, token.scopes),
              })),
            };
          },
        });
      } catch (e) {
        if (process.env.NODE_ENV === "development") {
          console.warn(e); // eslint-disable-line
        }
      }
    })
  );
}

const getScope = (scopeMap, tokens) => {
  // i > 0 because we wantto ignore `source.xxx` because its index is 0;
  for (let i = tokens.length - 1; i > 0; i -= 1) {
    const element = tokens[i];

    const splitted = element.split(".");
    // -1 because last we get empty string
    for (let i = 0; i < splitted.length - 1; i++) {
      const withScopeName = splitted
        .slice(0, splitted.length - i - 1)
        .concat(splitted[splitted.length - 1])
        .join(".");
      if (scopeMap[withScopeName]) {
        console.log(
          "withScopeName, scopeMap[withScopeName] :",
          withScopeName,
          scopeMap[withScopeName]
        );
        return withScopeName;
      } else {
        const withoutScopeName = splitted.slice(0, splitted.length - i - 1).join(".");
        if (scopeMap[withoutScopeName]) {
          console.log(
            "withoutScopeName, scopeMap[withoutScopeName] :",
            withoutScopeName,
            scopeMap[withoutScopeName]
          );
          return withoutScopeName;
        }
      }
    }

    // for (let i = 0; i < splitted.length - 1; i += 1) {
    //   const subscope = splitted
    //     .slice(0, splitted.length - i - 1)
    //     .concat(splitted[splitted.length - 1])
    //     .join(".");
    //   if (scopeMap[subscope]) {
    //     console.log("subscope, scopeMap[subscope] :", subscope, scopeMap[subscope]);
    //     return subscope;
    //   }
    // }
    // for (let i = 0; i < splitted.length - 1; i += 1) {
    //   const subscope = splitted.slice(0, splitted.length - i - 1).join(".");
    //   if (scopeMap[subscope]) {
    //     console.log("subscope, scopeMap[subscope] :", subscope, scopeMap[subscope]);
    //     return subscope;
    //   }
    // }
  }

  return tokens[tokens.length - 1];
};

/**
 *
 * 0 meta.function.definition.parameters.cpp
 * 1 meta.function.definition.parameters
 *
 * 2 meta.function.definition.cpp
 * 3 meta.function.definition
 *
 * 4 meta.function.cpp
 * 5 meta.function
 *
 * 6 meta.cpp
 * 7 meta
 */

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
export function wireTmGrammars(monaco, registry, languages, editor) {
  return Promise.all(
    Array.from(languages.keys()).map(async languageId => {
      try {
        const grammar = await registry.loadGrammar(languages.get(languageId));

        monaco.languages.setTokensProvider(languageId, {
          getInitialState: () => new TokenizerState(monacoTextmate1.INITIAL),
          tokenize: (line, state) => {
            const res = grammar.tokenizeLine(line, state.ruleStack);

            console.log("line, tokens :", line, res.tokens);
            return {
              endState: new TokenizerState(res.ruleStack),
              tokens: res.tokens.map(token => ({
                ...token,
                scopes: TMToMonacoToken(editor, token.scopes),
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

const TMToMonacoToken = (editor, scopes) => {
  let scopeName = "";
  // get the scope name. Example: cpp , java, haskell
  for (let i = scopes[0].length - 1; i >= 0; i -= 1) {
    const char = scopes[0][i];
    if (char === ".") {
      break;
    }
    scopeName = char + scopeName;
  }

  // iterate through all scopes from last to first
  for (let i = scopes.length - 1; i >= 0; i -= 1) {
    const scope = scopes[i];

    /**
     * Try all possible tokens from high specific token to low specific token
     *
     * Example:
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
    for (let i = scope.length - 1; i >= 0; i -= 1) {
      const char = scope[i];
      if (char === ".") {
        const token = scope.slice(0, i);
        if (
          editor._themeService.getTheme()._tokenTheme._match(token + "." + scopeName)._foreground >
          1
        ) {
          return token + "." + scopeName;
        }
        if (editor._themeService.getTheme()._tokenTheme._match(token)._foreground > 1) {
          return token;
        }
      }
    }
  }

  return "";
};

const getScope = (scopeMap, tokens) => {
  // i > 0 because we wantto ignore `source.xxx` because its index is 0;
  for (let i = tokens.length - 1; i >= 0; i -= 1) {
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

  return "";
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

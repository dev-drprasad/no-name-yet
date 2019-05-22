import Color from "color";
import baseColors from "../monaco-themes/vs-dark-tmtheme";

const sanitizeColor = color => {
  if (!color) {
    return color;
  }

  if (/#......$/.test(color) || /#........$/.test(color)) {
    return color;
  }

  try {
    return new Color(color).hexString();
  } catch (e) {
    return "#FF0000";
  }
};

const colorsAllowed = ({ foreground, background }) => {
  if (foreground === "inherit" || background === "inherit") {
    return false;
  }

  return true;
};

const getBase = type => {
  if (type === "dark") {
    return "vs-dark";
  }

  if (type === "hc") {
    return "hc-black";
  }
  return "vs";
};

const getTheme = theme => {
  const { tokenColors = [], colors = {} } = theme;
  // (baseColors.tokenColors || []).forEach(color => tokenColors.unshift(color));

  const rules = tokenColors
    .filter(t => t.settings && t.scope && colorsAllowed(t.settings))
    .reduce((acc, token) => {
      const settings = {
        foreground: sanitizeColor(token.settings.foreground),
        background: sanitizeColor(token.settings.background),
        fontStyle: token.settings.fontStyle,
      };

      const scope =
        typeof token.scope === "string" ? token.scope.split(",").map(a => a.trim()) : token.scope;

      scope.map(s =>
        acc.push({
          token: s,
          ...settings,
        })
      );

      return acc;
    }, []);

  const newColors = colors;
  Object.keys(colors).forEach(c => {
    if (newColors[c]) return c;

    delete newColors[c];

    return c;
  });

  return {
    colors: newColors,
    rules,
    type: theme.type,
    inherit: true,
    base: getBase(theme.type),
  };
};

export default getTheme;

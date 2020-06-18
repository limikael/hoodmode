module.exports={
  "only": ["src","node_modules/react-spring","node_modules/react-use-gesture"],
  "presets": ["@babel/preset-env","preact"],
  "plugins": [
    ["module-resolver", {
      "alias": {
        "react": "preact/compat",
      }
    }],
	  ["@babel/plugin-proposal-class-properties"],
    ["@babel/plugin-transform-react-jsx", { "pragma":"h" }]
  ]
}
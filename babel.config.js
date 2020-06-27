module.exports={
  "only": [
    "src",
    "node_modules/react-spring",
    "node_modules/react-use-gesture",
    "node_modules/@react-spring",
    "node_modules/use-memo-one",
    "node_modules/react-layout-effect",
    "node_modules/react-spinner-material"
  ],
  "presets": ["@babel/preset-env","preact"],
  "plugins": [
    ["module-resolver", {
      "alias": {
        "react": "preact/compat",
        "react-dom": "preact/compat"
      }
    }],
	  ["@babel/plugin-proposal-class-properties"],
    ["@babel/plugin-transform-react-jsx", { "pragma":"h" }]
  ]
}
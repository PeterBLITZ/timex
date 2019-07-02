# Simple Firefox Extension to track time spent on the page.

## How to run

`npm install --global web-ext`

then

`npm install && npm start`

## To do

1. Add styles.
2. Add pause button.
3. Daily usage.
4. Make it cross-browser.

## Requirements

<!-- **npx** - `npm install -g npx` -->

**web-ext** - `npm install --global web-ext`

**Node.js** >= 10

**Firefox** > 48

## Tested on

**Firefox** - 67.0.4

**macOS** - 10.14.5

**Node.js** - 10.16.0

**npm** - 6.9.0

## Troubleshooting

If you see something like this:

`dyld: lazy symbol binding failed: Symbol not found: _usdt_create_provider`

`dyld: Symbol not found: _usdt_create_provider`

Try:

`brew uninstall --force binutils`

`brew install binutils`

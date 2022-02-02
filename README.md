# Toy Robot

This is a [Toy Robot](https://zone.github.io/frontend/toy-robot) application that runs in the browser. It accepts input in a `textarea` and returns coordinates based on where the robot was instructed to move.

Input should be provided in the following format:

```
PLACE 0,0,EAST
MOVE
MOVE
LEFT
MOVE
REPORT
```

where a robot must be placed before it can move and pivot.

## Intructions

1. Install Node.js, I reccomend using [nvm](https://github.com/nvm-sh/nvm), I'm currently running `v14.18.1`

2. Install [Yarn](https://yarnpkg.com/getting-started/install)

3. Clone this repo

```bash
git clone git@github.com:harrisonmalone/toy-robot.git
```

and `cd` into the `toy-robot` directory 

4. Run `yarn install` to install dependencies

5. Run `yarn start` to compile and start the development server

6. Open a browser at `http://localhost:3000`

7. Enter the input, for example

```
PLACE 0,0,EAST
MOVE
MOVE
LEFT
MOVE
REPORT
```

8. Click on submit

9. You should see the coordinates of

```
2,1,NORTH
```

underneath the output heading

## Running tests

To run tests `cd` into the `toy-robot` directory and run

```bash
yarn test
```
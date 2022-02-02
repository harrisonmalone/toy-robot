import { Robot } from "./robot";

describe("Robot", () => {
  test("should be initialized with an x axis of 0, a y axis of 0 and a direction of NORTH", () => {
    const mockInput = "PLACE 0,0,NORTH";
    const robot = new Robot(mockInput);
    expect(robot.x).toBe(0);
    expect(robot.y).toBe(0);
    expect(robot.direction).toBe("NORTH");
  });

  test("should be initialized with an x axis of 2, a y axis of 4 and a direction of SOUTH", () => {
    const mockInput = "PLACE 2,4,SOUTH";
    const robot = new Robot(mockInput);
    expect(robot.x).toBe(2);
    expect(robot.y).toBe(4);
    expect(robot.direction).toBe("SOUTH");
  });

  test("should set 'PLACE command invalid' error message with incorrect x axis input", () => {
    const mockInput = "PLACE 5,4,SOUTH";
    const robot = new Robot(mockInput);
    expect(robot.errMessage).toBe("PLACE command invalid");
  });

  test("should set 'PLACE command invalid' error with incorrect y axis input", () => {
    const mockInput = "PLACE 4,7,SOUTH";
    const robot = new Robot(mockInput);
    expect(robot.errMessage).toBe("PLACE command invalid");
  });

  test("should set 'PLACE command invalid' error with incorrect direction input", () => {
    const mockInput = "PLACE 4,7,RANDOM";
    const robot = new Robot(mockInput);
    expect(robot.errMessage).toBe("PLACE command invalid");
  });

  test("should move to y axis of 1", () => {
    const mockInput = "PLACE 0,0,NORTH\nMOVE";
    const robot = new Robot(mockInput);
    expect(robot.y).toBe(1);
  });

  test("should move to y axis of 3", () => {
    const mockInput = "PLACE 0,2,NORTH\nMOVE";
    const robot = new Robot(mockInput);
    expect(robot.y).toBe(3);
  });

  test("should move to x axis of 1", () => {
    const mockInput = "PLACE 0,0,EAST\nMOVE";
    const robot = new Robot(mockInput);
    expect(robot.x).toBe(1);
  });

  test("should move to x axis of 3", () => {
    const mockInput = "PLACE 2,0,EAST\nMOVE";
    const robot = new Robot(mockInput);
    expect(robot.x).toBe(3);
  });

  test("should not report", () => {
    const mockInput = "PLACE 2,0,EAST\nMOVE";
    const robot = new Robot(mockInput);
    expect(robot.shouldReport).toBeFalsy();
  });

  test("should ignore move if can't go any further south", () => {
    const mockInput = "PLACE 0,0,SOUTH\nMOVE";
    const robot = new Robot(mockInput);
    expect(robot.y).toBe(0);
  });

  test("should ignore move if can't go any further north", () => {
    const mockInput = "PLACE 0,4,NORTH\nMOVE";
    const robot = new Robot(mockInput);
    expect(robot.y).toBe(4);
  });

  test("should ignore move if can't go any further west", () => {
    const mockInput = "PLACE 0,0,WEST\nMOVE";
    const robot = new Robot(mockInput);
    expect(robot.x).toBe(0);
  });

  test("should ignore move if can't go any further east", () => {
    const mockInput = "PLACE 4,4,EAST\nMOVE";
    const robot = new Robot(mockInput);
    expect(robot.x).toBe(4);
  });

  test("should report 0,1,NORTH", () => {
    const mockInput = "PLACE 0,0,NORTH\nMOVE\nREPORT";
    const robot = new Robot(mockInput);
    expect(robot.report()).toBe("0,1,NORTH");
  });

  test("should report 0,1,EAST", () => {
    const mockInput = "PLACE 0,0,EAST\nMOVE\nREPORT";
    const robot = new Robot(mockInput);
    expect(robot.report()).toBe("1,0,EAST");
  });

  test("should report 1,0,SOUTH", () => {
    const mockInput = "PLACE 0,1,SOUTH\nMOVE\nLEFT\nMOVE\nRIGHT\nREPORT";
    const robot = new Robot(mockInput);
    expect(robot.report()).toBe("1,0,SOUTH");
  });

  test("should report 1,4,WEST", () => {
    const mockInput = "PLACE 3,3,NORTH\nMOVE\nLEFT\nMOVE\nMOVE\nREPORT";
    const robot = new Robot(mockInput);
    expect(robot.report()).toBe("1,4,WEST");
  });
});

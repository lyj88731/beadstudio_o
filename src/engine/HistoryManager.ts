export interface HistoryAction {

  x:number;

  y:number;

  before:number;

  after:number;

}



export default class HistoryManager {


  private undoStack:
    HistoryAction[][] = [];


  private redoStack:
    HistoryAction[][] = [];



  push(
    action:HistoryAction[]
  ){

    this.undoStack.push(
      action
    );


    this.redoStack = [];

  }



  undo(){

    const action =
      this.undoStack.pop();


    if(!action)
      return null;



    this.redoStack.push(
      action
    );


    return action;

  }



  redo(){

    const action =
      this.redoStack.pop();


    if(!action)
      return null;



    this.undoStack.push(
      action
    );


    return action;

  }



  clear(){

    this.undoStack = [];

    this.redoStack = [];

  }


}
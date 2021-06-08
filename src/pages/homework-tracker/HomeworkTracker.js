// @ts-check
import React from "react";
import Header from "../../common/react/Header";
import Button from "../../common/react/button/Button";
import EditPopup from "./react/EditPopup";
import SortPopup from "./react/SortPopup";
import Assignment from "./code/Assignment";
import AssignmentRow from "./react/AssignmentRow";
import "./HomeworkTracker.scss"
import Translate from "../../common/lang/Translate";

/*LAYOUT PLAN

 [<] Homework Tracker
-----------------------------
 [ sorting: Due (soonest) ]
 [    + Add Assignment    ]
- - - - - - - - - - - - - - -
 > Assignment A (3dy)
 > yeet (2wk)
 > A thing (today)
 v ExampleOpenedAssignment
 | Due: 7/13/20 (4dy)
 | Subject: "Math lol"
 | Link: [link if provided]
 > Assignmet (overdue)
*/


//const htStorage = new NamespacedStorage("homework-tracker");

// !!DEBUG
const assignmentsTemp = new Array(3).fill().map(()=>new Assignment());
assignmentsTemp[0].name = "a";
assignmentsTemp[1].name = "second1";
assignmentsTemp[2].due.set(10,4,2023);
// !!/DEBUG

/** @extends {React.Component<{},{popup?:"add"|"sort"|"edit",assignments:Assignment[],editingAssignment?:Assignment,sorting:any},any>} */
class HomeworkTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {popup:null,sorting:null,assignments:assignmentsTemp};
        window["hte"] = this; // !!DEBUG
    }

    openAddPopup() {
        var assignment = new Assignment();
        this.addAssignment(assignment);
        this.setState({editingAssignment:assignment,popup:"add"});
    }
    cancelEdit() {
        if (this.state.popup === "add")
            this.removeAssignment(this.state.editingAssignment);
        this.closePopup();
    }
    /** @param {Assignment} assignment */
    openEditPopup(assignment) { this.setState({editingAssignment:assignment,popup:"edit"}); }
    openSortPopup() { this.setState({popup:"sort"}); }
    closePopup() { this.setState({popup:null}); }

    /** @param {Assignment} assignment */
    addAssignment(assignment) {
        this.state.assignments.push(assignment);
        this.closePopup();
    }
    /** @param {this["state"]["assignments"][number]} assignment */
    removeAssignment(assignment) {
        var i = this.state.assignments.indexOf(assignment);
        if (i >= 0) this.state.assignments.splice(i,1);
        this.forceUpdate();
    }
    /** @param {this["state"]["assignments"][number]} assignment */
    setEditingAssignment(assignment) {
        this.setState({editingAssignment: assignment});
    }

    /** @param {import("./code/hw-tracker").SortConfig} sortConfig */
    updateSorting(sortConfig) {
        console.log("!!UPDATING SORTING",sortConfig);
        this.setState({sorting:sortConfig});
        this.closePopup();
    }


    render() {
        return (<div className="HomeworkTracker">
            <Header nameKey="hw-tracker" />
            <div role="main">
                <Button action={()=>this.openAddPopup()} nameKey={"hw-tracker.popup.create"} className="-add-button" />
                <Button action={()=>this.openSortPopup()} nameKey={"hw-tracker.popup.sort"} className="-sort-button"/>
                <div className="-Assignments">
                    {this.state.assignments.length > 0 ?
                        this.state.assignments.map(assignment=>
                            <AssignmentRow key={assignment.reactKey} assignment={assignment}
                                edit={()=>this.openEditPopup(assignment)}
                                remove={()=>this.removeAssignment(assignment)} /> ) :
                        <Translate text="!!no assignments" />
                    }
                </div>
            </div>
            { (this.state.popup === "add" || this.state.popup === "edit") && 
                <EditPopup
                    assignment={this.state.editingAssignment}
                    done={()=>this.closePopup()}
                    cancel={()=>this.cancelEdit()} /> }
            { this.state.popup === "sort" &&
                <SortPopup
                    done={sortConfig=>this.updateSorting(sortConfig)}
                    cancel={()=>this.closePopup()} /> }
        </div>);
    }
}

export default HomeworkTracker;
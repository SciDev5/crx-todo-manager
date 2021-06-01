// @ts-check
import React from "react";
import Translate from "../../../common/lang/Translate";
import Button from "../../../common/react/button/Button";
import DateInput from "../../../common/react/input/DateInput";
import TextInput from "../../../common/react/input/TextInput";
import Popup from "../../../common/react/popup/Popup";
import Assignment from "../code/Assignment";

/** @extends {React.Component<{done:()=>any,cancel:()=>any,assignment:Assignment},{assignment:Assignment},{}>} */
class EditPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {assignment: new Assignment()}
        if (props.assignment)
            this.state.assignment.json = props.assignment.json;
    }
    /** Update a property of the assignment.
     * @param {string} prop 
     * @param {any} value */
    update(prop,value) {
        var assignment = this.state.assignment;
        assignment[prop] = value;
        this.forceUpdate();
    }

    done() {
        // Copy new data into assignment
        this.props.assignment.json = this.state.assignment.json;
        this.props.done();
    }
    cancel() {
        this.props.cancel();
    }
    render() {
        var assignment = this.state.assignment;
        return (<Popup className="hwt-EditPopup">
            <div className="-input"><span><Translate text="!!name"/></span><TextInput placeholder="!!name" change={this.update.bind(this,"name")} value={assignment.name}/></div>
            <div className="-input"><span><Translate text="!!subject"/></span><TextInput placeholder="!!subject" change={this.update.bind(this,"subject")} value={assignment.subject}/></div>
            <div className="-input"><span><Translate text="!!link"/></span><TextInput placeholder="!!link" change={this.update.bind(this,"link")} value={assignment.link}/></div>
            <div className="-input"><span><Translate text="!!date"/></span><DateInput ariaLabel="!!date" change={this.update.bind(this,"due")} value={assignment.due} /></div>
            <Button action={()=>this.done()} nameKey="!!done"/>
            <Button action={()=>this.cancel()} nameKey="!!cancel"/>
        </Popup>);
    }
}

export default EditPopup;
import React from "react";

class Main extends React.Component {
    render() {
        return (
            <div>
                <h1>ALL THE DETAILS</h1>
                You clicked on id: {this.props.params.id}
            </div>
        );
    }
}

export default Main;

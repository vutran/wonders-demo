import Wonders from 'wonders';
import beep from './commands/beep';
import search from './commands/search';

class Item extends Wonders.Component {
    render() {
        return <p><strong>{this.props.name}</strong></p>;
    }
}

class Test extends Wonders.Component {
    render() {
        return (
            <div>
                <Item name="Foo" />
                <Item name="Bar" />
            </div>
        );
    }
}

// creates the program
export default function() {
    return (
        <program version="1.0.0" parse={process.argv}>
            <command
                name="search"
                description="Search for a repository on GitHub."
                onAction={search}
            />
            <command name="beep" description="Prints Beep!" onAction={beep} />
            <command name="beep" description="Prints Beep!" onAction={beep} />
            <command name="boop" description="Prints Boop!">Boop!</command>
            <command name="test" description="Test class components">
                <Test>this should not be printed.</Test>
            </command>
            <command name="fancy" description="Prints fancy text!">
                <strong>strong</strong>
                <em>italic</em>
                <u>underline</u>
            </command>
            <command name="superfancy" description="Even more fancy text!">
                <p>
                    <em>italics</em>
                    <strong>bold</strong>
                    <u>underlined</u>
                    <p>
                        <em><strong>nested bold/italics paragraph!</strong></em>
                    </p>
                </p>
                <p>
                    <em>test</em>
                </p>
            </command>
        </program>
    );
}

import React from 'react';
import { connect } from 'react-redux';
import FormInput from '../common_components/FormInput';
import Select from '../common_components/SelectInput';
import PreviewInput from '../common_components/PreviewInput';
import { editActions } from '../../actions/edit.actions';
import { Link } from "react-router-dom";
const db = require('./../../../db/db');

const blueButton = {
  backgroundColor: "blue",
  fontSize: '20px'
};

const divStyle = {
  borderColor: 'black',
  borderWidth: 2
};

class NewLessonElement extends React.Component {



  constructor() {
    super();
    this.state = {
      element_word: '',
      // eslint-disable-next-line react/no-unused-state
      element_wordType: '',
      images: [null],
      wordTypes: [],
      errors: {},
      pending: false,
      submitted: false,
      existingWords: [],
      selectedElements: [],
      userType: '',
      userWord: '',
      userCategory: '',
      createdCategoryOptions: [],
      lessonName: ''

    };
    this.selectElement = this.selectElement.bind(this);
    this.removeElement = this.removeElement.bind(this);
    this.saveLesson = this.saveLesson.bind(this);
    this.createElement = this.createElement.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSelectChangeForCategory = this.handleSelectChangeForCategory.bind(this);
    this.handleWordChange = this.handleWordChange.bind(this);
    this.handleWordChangeCat = this.handleWordChangeCat.bind(this);
    this.handleWordChangeType = this.handleWordChangeType.bind(this);
    this.handleName = this.handleName.bind(this);
  }

  handleSelectChange(e) {
    this.setState({ userType: e.target.value });
  }

  handleSelectChangeForCategory(e) {
    this.setState({ userCategory: e.target.value });
  }
  handleWordChange(e) {
    this.setState({ userWord: e.target.value });
  }
  handleWordChangeCat(e) {
    this.setState({ userWord: e.target.value });
  }
  handleWordChangeType(e) {
    this.setState({ userWord: e.target.value });
  }
  handleName(e) {
    this.setState({ lessonName: e.target.value });
  }

  saveLesson(parent) {
    let elements = this.state.selectedElements;
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDay();
    let time = new Date().getTime();
    let timezoneoffset = new Date().getTimezoneOffset();
    let dateo = `${year}-${month}-${day} ${time} +${timezoneoffset}`;
    let updatedAt = dateo;
    for (let i = 0; i < elements.length; i++) {
      let type = elements[i]["props"]["type"];
      let word = elements[i]["props"]["name"];
      let category = elements[i]["props"]["category"];

      /*db.sequelize.query(`insert into Lessons ("type", "word", "createdAt", "updatedAt", "word_category") values ('${type}', '${word}', '${dateo}', '${updatedAt}','${category}')`).then(([results, metadata]) => {
      // Ideally you would want to redo your Lessons table because as of right now it only contains a name, thumbnail, createdAt and updatedAt fields
      // I would add the fields that are in Lesson_Elements_2 to Lessons and then you can uncomment this and itll add the chosen lesson elements into Lessons table to compose a whole full lesson
      });*/
    }

    let lessonName = this.state.lessonName;
    db.sequelize.query(`insert into Lessons ("name", "thumbnail", "createdAt", "updatedAt") values ('${lessonName}', 'someThumbnail.png', '${dateo}', '${updatedAt}')`).then(([results, metadata]) => {
      // Basically this is how you "save" your lessons but because the table Lessons only has 4 fields right now (name, thumbnail, createdAt and updatedAt, then im  not gonna make a new table)
    });

  }
  removeElement(parent) {
    let id = parent.target.id;
    let arr = this.state.selectedElements;
    for(let i = 0; i < arr.length; i++){
      console.log(arr[i]["key"]);
      if (arr[i]["key"] === id) {
        arr.splice(i, 1);
        this.setState({selectedElements: arr});
        break
      }
    }
  }
  test() {
    console.log("oo");
  }
  selectElement(parent) {
    // selects elements that already exist in the db
    let dataId = parent.target.id;
    db.sequelize.query(`select * from Lesson_Elements_2 where id = '${dataId}'`).then(([results, metadata]) => {
      let elements = this.state.selectedElements;
      for (let i = 0; i < results.length; i++) {
        /*elements.push(<div style={divStyle} key={results[i]["id"]}>
          <span>Type:</span>&nbsp; <b>{results[i]["type"]}</b>&nbsp;&nbsp;
          <span>Word:</span>&nbsp; <b>{results[i]["word"]}</b>&nbsp;&nbsp;
          <button onClick={this.removeElement} id={results[i]["id"]} >-</button>
        </div>);*/
        elements.push(<PreviewInput label={results[i]["word"]} category={results[i]["word_category"]} key={results[i]["id"]} pid={results[i]["id"]} type={results[i]["type"]} remove={this.removeElement} name={results[i]["word"]} files={["f", "b"]} onChange={this.test}/> );
      }

      this.setState({
        selectedElements: elements
      })

    });
  }
  createElement(parent) {
    let type = this.state.userType;
    let word = this.state.userWord;
    let category = this.state.userCategory;
    let createdAt = new Date().getDate();
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDay();
    let time = new Date().getTime();
    let timezoneoffset = new Date().getTimezoneOffset();
    let dateo = `${year}-${month}-${day} ${time} +${timezoneoffset}`;
    let name = this.state.lessonName;
    let updatedAt = dateo;
    db.sequelize.query(`insert into Lesson_Elements_2 ("type", "name","word", "createdAt", "updatedAt", "word_category") values ('${type}', '${name}', '${word}', '${dateo}', '${updatedAt}','${category}')`).then(([results, metadata]) => {
        this.setState({
          userType: '',
          userWord: '',
          userCategory: '',
        });
      db.sequelize.query("select * from Lesson_Elements_2").then(([results, metadata]) => {
        let existingElements = [];
        for (let i = 0; i < results.length; i++) {
          console.log(results[i]);
          existingElements.push(
            <div style={divStyle}>
              <span>Type:</span>&nbsp; <b>{results[i]["type"]}</b>&nbsp;&nbsp;
              <span>Word:</span>&nbsp; <b>{results[i]["word"]}</b>&nbsp;&nbsp;
              <button onClick={this.selectElement} id={results[i]["id"]} >+</button>
            </div>);
        }
        this.setState({
          existingWords: existingElements
        })
      });
    });


  }
  componentDidMount() {
    db.sequelize.query("select distinct type from Lesson_Elements_2").then(([results, metadata]) => {
      let wordTypes = [];
      for (let i = 0; i < results.length; i++) {
        wordTypes.push(results[i]["type"]);
        console.log(wordTypes, "type");
      }
      console.log(wordTypes, "wf");
      this.setState({
        wordTypes: wordTypes
      })
    });
    db.sequelize.query("select distinct word_category from Lesson_Elements_2").then(([results, metadata]) => {
      let categoryTypes = [];
      for (let i = 0; i < results.length; i++) {
        categoryTypes.push(results[i]["word_category"]);
      }
      console.log(categoryTypes, "wf");
      this.setState({
        createdCategoryOptions: categoryTypes
      })
    });
    db.sequelize.query("select * from Lesson_Elements_2").then(([results, metadata]) => {
      let existingElements = [];
      for (let i = 0; i < results.length; i++) {
        console.log(results[i]);
        existingElements.push(
          <div style={divStyle}>
            <span>Type:</span>&nbsp; <b>{results[i]["type"]}</b>&nbsp;&nbsp;
            <span>Word:</span>&nbsp; <b>{results[i]["word"]}</b>&nbsp;&nbsp;
            <button onClick={this.selectElement} id={results[i]["id"]} >+</button>
          </div>);
      }
      this.setState({
        existingWords: existingElements
      })
    });
  }



  render() {
    const { pending, errors } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <h1>Add a new lesson</h1>
        </div>

        <div className="row">
          <div className="col-sm-3">
            <p>Lesson name</p>
          </div>
          <div className="col-sm-9">
            <FormInput name="LessonName" placeholder="Enter lesson name here"  onChange={this.handleName}/>

          </div>
        </div>
        <hr/>
        <div>
          <h2>Step 1: Add Nouns</h2>
          <p>You can add as many as you want, use the + button to add more. Click next if you want to add verbs for this lesson. Otherwise, click save.</p>
          <hr/>
          <button style={blueButton}>+</button>
          <hr/>
          <table>
            <tr>
              <th>Already created elements &nbsp;</th>
              <th>Create new elements</th>
            </tr>
            <tr>
              <td>
                <div>
                  {this.state.existingWords}
                </div>
              </td>
              <td>
                <Select
                  title="Type"
                  name="type"
                  options={this.state.wordTypes}
                  value={this.state.userType}
                  placeholder="Select a type"
                  handleChange={this.handleSelectChange}
                />
                <FormInput name="TypeCustom" placeholder="Enter your custom type here"  onChange={this.handleSelectChange}/>

                <Select
                  title="Category"
                  name="category"
                  options={this.state.createdCategoryOptions}
                  value={this.state.userCategory}
                  placeholder="Select a type"
                  handleChange={this.handleSelectChangeForCategory}
                />
                <FormInput name="CategoryCustom" placeholder="Enter your custom category here"  onChange={this.handleSelectChangeForCategory}/>

                <FormInput name="Word" placeholder="Enter your word here"  onChange={this.handleWordChange}/>
                <button onClick={this.createElement}>Create element</button>
              </td>
            </tr>
          </table>
          <hr/>
          <div>
            <h4>Added elements</h4>
            <div>
              {this.state.selectedElements}
            </div>
          </div>
        </div>
        <br/>
        <hr/>
        <br/>
        <div>
          <h2>Save Lesson</h2>
          <button onClick={this.saveLesson}>Save</button>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { pending } = state.editForm;
  return { pending };
}

const actionCreators = {
  pending: editActions.pending
};

const connectedElementForm = connect(
  mapState,
  actionCreators
)(NewLessonElement);

// eslint-disable-next-line import/prefer-default-export
export { connectedElementForm as NewLessonElement };

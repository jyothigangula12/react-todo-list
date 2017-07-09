import React, { PropTypes } from 'react';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import Request from 'superagent';
import axios from 'axios';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Pagination from 'material-ui-pagination';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
//import materialize from 'materialize-css'
import {TableFooter as TF, FontIcon, IconButton} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider' 
injectTapEventPlugin();

class App extends React.Component{
    
    constructor(props) {
	    super(props);
	    this.state = {
	     recordsper_page: 3,
	     currentPage: 1,
	     number : 1,
	     pages : '',
	     startIndex : 0,
	     films : [],
	     recperpage : [],
	     selectedrecnum : '',  
	    };
   
    }

    componentDidMount(){
        //Fetching data from api
	    var url = 'http://swapi.co/api/films/';
 	    Request.get(url).then((response) => {
	 	    let recForReference = JSON.parse(JSON.stringify(response.body.results))
	 		let defaultRec = [recForReference[0],recForReference[1],recForReference[2]]
	        
	        //set state for storing records
	 		this.setState({
	 			films : response.body.results,
	 			recperpage : defaultRec
	 		})
	        
	        //calculating number of pages
	 		let numberOfPages = recForReference.length / this.state.recordsper_page
	   	        this.setState({pages : Math.ceil(numberOfPages)})
 	    })

 	}
    selectNumber(event){
    // Event for taking input from pagination
    // calculating starting index and ending index
	this.setState({ currentPage : event })
    const indexOfLast = event * this.state.recordsper_page;
    const indexOfFirst = indexOfLast - this.state.recordsper_page;
    const slicedrec = this.state.films.slice(indexOfFirst, indexOfLast);
    this.setState({recperpage : slicedrec,
                   startIndex : indexOfFirst});
    

    }
    handleCellClick (rowNumber, columnNumber, evt) {
    //click event to get row number and column number 	
    //set index for correct rec
    console.log("rowNumber, columnNumber,activityId", rowNumber, columnNumber , evt);
    console.log("index number" ,rowNumber + this.state.startIndex)
  
  	this.setState({ showModal : true ,
                  selectedrecnum : rowNumber + this.state.startIndex});
  
  
    }

	close(event) {
		//event for close model
	    event.preventDefault();
	    this.setState({ showModal : false });
	}

    render() {
  	
	  	return (

	    <MuiThemeProvider >	
	    <div>
	    <h1 className="pageTitle">Star Wars</h1>
	    <Table onCellClick = {this.handleCellClick.bind(this)}>
		    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
		        <TableRow>
		       
			        <TableHeaderColumn>Title</TableHeaderColumn>
			        <TableHeaderColumn>Director</TableHeaderColumn>
			        <TableHeaderColumn>Producer</TableHeaderColumn>
			        <TableHeaderColumn>Created</TableHeaderColumn>
			        <TableHeaderColumn>EpisodeId</TableHeaderColumn>
		        </TableRow>
		    </TableHeader>
		    <TableBody displayRowCheckbox={false}>
		    
	            {this.state.recperpage.map((data,i) => {
			    	
			       		return ( 
						    <TableRow >
						       
						        <TableRowColumn >{data.title} </TableRowColumn>
						        <TableRowColumn>{data.director}</TableRowColumn>
						        <TableRowColumn>{data.producer}</TableRowColumn>
						        <TableRowColumn>{data.created}</TableRowColumn>
						        <TableRowColumn>{data.episode_id}</TableRowColumn>
						    </TableRow>
						) 
	
		       	})}
		
		    </TableBody>
	    </Table>
	  
        <Pagination 
          total = {this.state.pages }
          current = { this.state.number}
          display = { this.state.pages }
          onChange = { this.selectNumber.bind(this) }
          onMouseOver = { currentPage => this.setState({ currentPage })}
        />
	  
        <Modal show = {this.state.showModal}>
            <Modal.Header>
                <Modal.Title> Film Description </Modal.Title>
            </Modal.Header>
       
            <Modal.Body>
		     
	            {this.state.films.map((data,i) => {
			    	if(i==this.state.selectedrecnum){
			       		return ( 
						    <ul>
						        <h5>Film Title :</h5>
						        <li>{data.title}</li>
						        <h5>Director :</h5>
						        <li>{data.director}</li>
						        <h5>Producer :</h5>
						        <li>{data.producer}</li>
						        <h5>Created :</h5>
						        <li>{data.created}</li>
						        
						        <h5>Edited :</h5>
						        <li>{data.edited}</li>
						        <h5>Episode Id :</h5>
						        <li>{data.episode_id}</li>
						        <h5>Opening Crawl :</h5>
						        <li>{data.opening_crawl}</li>
						        <h5>Release Date :</h5>
						        <li>{data.release_date}</li>
						    </ul>
						) 
	                }
		       	})} 
	        </Modal.Body>
	        <Modal.Footer >
	            <Button onClick={this.close.bind(this)}>Close</Button>
	        </Modal.Footer>
	    </Modal>  

    </div>

    </MuiThemeProvider>
	)}
  

}

 

export default App


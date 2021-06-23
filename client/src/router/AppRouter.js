import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import PageNotFound from '../components/PageNotFound';
import ShowStories from '../components/ShowStories';
import '../styles.scss';

class AppRouter extends Component {
  constructor() {

    super();
    this.state = { data: [], open: false, username: "", pass: "",   bookmarked: [
        {
          title: "",
          link: ""
        }
      ] };
    fetch("http://localhost:3000/showall")
      .then(data => data.json())
      .then(data => {
        console.log(data);
        // this.setState({ data: data });
      });

      // onClickHandler(){
      //   console.log(this.refs["simpleForm"].getFormValues());
      //   let obj = this.refs["simpleForm"].getFormValues();
      //   fetch("http://localhost:3001/newbookmark", {
      //   method: "post",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(obj)
      //   });
      // }
  }
  render(){
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Switch>
          <Route path="/" render={() => <Redirect to="/top" />} exact={true} />
          <Route
            path="/:type"
            render={({ match }) => {
              const { type } = match.params;
              if (!['top', 'new', 'best'].includes(type)) {
                return <Redirect to="/showall" />;
              }
              return <ShowStories type={type} />;
            }}
          />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
};

export default AppRouter;

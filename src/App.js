import React from "react";

import { Cards, Chart, ProvincePicker, Header, Footer } from "./components";
import styles from "./App.module.css";
import { fetchDailyGlobalData, fetchDailiesData } from "./api";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleProvincePick = this.handleProvincePick.bind(this);
    this.state = {
      dataLoaded: false,
      province: "Canada"
    };
  }

  async componentDidMount() {
    const globalData = await fetchDailyGlobalData();

    this.setState({
      ...this.state,
      globalData
    });

    const dailiesData = await fetchDailiesData();

    this.setState({
      ...this.state,
      globalData,
      dailiesData,
      dataLoaded: true
    });
  }

  handleProvincePick(e) {
    this.setState({
      ...this.state,
      province: e.target.value
    });
    console.log(this.state.province);
  }

  render() {
    const { globalData, dailiesData } = this.state;
    return (
      <div className={styles.container}>
        <Header />
        <Cards globalData={globalData} dailiesData={dailiesData} province={this.state.province} />
        <ProvincePicker handleProvincePick={this.handleProvincePick} dataLoaded={this.state.dataLoaded}/>
        <Chart dailiesData={dailiesData} province={this.state.province} />
        <Footer />
      </div>
    );
  }
}

export default App;

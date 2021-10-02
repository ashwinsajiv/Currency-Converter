import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import switchIco from "./switch.svg";
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Button from "@material-ui/core/Button";
import * as ReactBootStrap from "react-bootstrap";

import {
  GlobalStyle,
  AppWrapper,
  Error,
  CurrencyConverter,
  CurrencyInfo,
  Input,
  Loading,
  Image
} from "../styles";

import { Select } from "../Select";
import { Line } from "react-chartjs-2";

import {
  getRate,
  fromChangeInput,
  toChangeInput,
  fromCurrencyChange,
  toCurrencyChange,
  handleSwitch,
  getHistory, 
  save
} from "../../store/actions/currencyActions";

import currencyExchangeList from "../../consts/CurrencyCodes";
import { displayCurrency, formatDate } from "../../utils/currencyUtils";

function Currency({
  error,
  isFetched,
  from,
  to,
  convertFrom,
  convertTo,
  historyDates,
  historyValues,
  fromChangeInput,
  fromCurrencyChange,
  toChangeInput,
  toCurrencyChange,
  handleSwitch,
  getRate,
  getHistory,
  saved
}) {
  useEffect(() => {
    getRate(convertFrom, convertTo);
    getHistory(convertFrom, convertTo);
  }, []);


  const lineData = {
    labels: historyDates,
    datasets: [
      {
        label: "Conversion rate history",
        data: historyValues,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };
  const currencyList = Object.values(currencyExchangeList);
  return (
    <Fragment>
      <GlobalStyle />
      {error && <Error>{error.message}</Error>}
      {!isFetched && !error && <Loading>Loading...</Loading>}
      <Tabs>
        <TabList>
          <Tab>Rates</Tab>
          <Tab>Chart</Tab>
          <Tab>Saved</Tab>
        </TabList>
        <TabPanel>
          {isFetched && (
            <AppWrapper>
              <CurrencyInfo>
                <p>
                  {displayCurrency({
                    currencyList,
                    currencyId: convertFrom,
                    number: from
                  })}{" "}
                  equals{" "}
                </p>
                <h4>
                  {displayCurrency({
                    currencyList,
                    currencyId: convertTo,
                    number: to
                  })}
                </h4>
              </CurrencyInfo>
              <CurrencyConverter>
                <Input
                  type="number"
                  value={from}
                  onChange={e => fromChangeInput(e.target.value)}
                />
                <Select
                  value={convertFrom}
                  onChange={e => fromCurrencyChange(e.target.value)}
                  currencyList={currencyList}
                />
              </CurrencyConverter>
              <Image
                  onClick={handleSwitch}
                  width="50"
                  src={switchIco}
                  alt="Switch"
              />
              <CurrencyConverter>
                <Input
                  type="number"
                  value={to}
                  onChange={e => toChangeInput(e.target.value)}
                />
                <Select
                  value={convertTo}
                  onChange={e => toCurrencyChange(e.target.value)}
                  currencyList={currencyList}
                />
              </CurrencyConverter>
              <Button variant="contained" onClick={() => {
                var updateSaved = saved;
                var d = new Date();
                d.setDate(d.getDate());
                save(updateSaved.push(
                  {
                    to: to,
                    from: from,
                    convertFrom: convertFrom,
                    convertTo: convertTo,
                    date: formatDate(d)
                  }
                ));
              }}>
                Save
              </Button>
            </AppWrapper>
          )}
        </TabPanel>
        <TabPanel>
          <div className="App">
            <Line data={lineData} />
          </div>
        </TabPanel>
        <TabPanel>
          <ReactBootStrap.Table striped bordered hover>
            <thead>
              <tr>
                <th>Convert From</th>
                <th>FValue</th>
                <th>Convert To</th>
                <th>TValue</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {saved.map(renderSaved)}
            </tbody>
          </ReactBootStrap.Table>
        </TabPanel>
      </Tabs>
    </Fragment>
  );
}

const renderSaved = (obj, index) => {
  console.log(obj);
  return(
    <tr key={index}>
      <td>{obj.convertFrom}</td>
      <td>{obj.from}</td>
      <td>{obj.convertTo}</td>
      <td>{obj.to}</td>
      <td>{obj.date}</td>
    </tr>
  )
}

const mapStateToProps = ({ currency }) => ({
  currency: currency.data,
  error: currency.error,
  isFetched: currency.isFetched,
  from: currency.from,
  to: currency.to,
  historyDates: currency.historyDates,
  historyValues: currency.historyValues,
  convertFrom: currency.convertFrom,
  convertTo: currency.convertTo,
  toChangeInput: currency.toChangeInput,
  fromChangeInput: currency.fromChangeInput,
  fromCurrencyChange: currency.fromCurrencyChange,
  toCurrencyChange: currency.toCurrencyChange,
  handleSwitch: currency.handleSwitch,
  getRate: currency.getRate,
  getHistory: currency.getHistory,
  save: currency.save,
  saved: currency.saved
});

const mapDispatchToProps = dispatch => ({
  getRate: (fromCurrency, toCurrency) => {
    dispatch(getRate(fromCurrency, toCurrency));
  },
  getHistory: (fromCurrency, toCurrency) => {
    dispatch(getHistory(fromCurrency, toCurrency));
  },
  toChangeInput: value => {
    dispatch(toChangeInput(value));
  },
  fromChangeInput: value => {
    dispatch(fromChangeInput(value));
  },
  fromCurrencyChange: payload => {
    dispatch(fromCurrencyChange(payload));
  },
  toCurrencyChange: payload => {
    dispatch(toCurrencyChange(payload));
  },
  handleSwitch: payload => {
    dispatch(handleSwitch(payload));
  },
  save: payload => {
    dispatch(save(payload));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Currency);

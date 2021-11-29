import React from "react";
import millify from "millify";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import Loading from "./Loading";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const stateTotal = data?.data?.stats;
  if (isFetching) return <Loading />;
  return (
    <div>
      <Typography.Title level={2} className="heading">
        Global Crypto Stats
      </Typography.Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={stateTotal.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(stateTotal.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap:"
            value={millify(stateTotal.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(stateTotal.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={millify(stateTotal.total)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(stateTotal.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Typography.Title level={2} className="home-title">
          Top 10 Cryptos In The World
        </Typography.Title>
        <Typography.Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </Typography.Title>
      </div>
      <Cryptocurrencies simplified={true} />
      <div className="home-heading-container">
        <Typography.Title level={2} className="home-title">
          Latest Crypto News
        </Typography.Title>
        <Typography.Title level={3}>
          <Link to="/news">Show more</Link>
        </Typography.Title>
      </div>
      <News simplified={true} />
    </div>
  );
};

export default HomePage;

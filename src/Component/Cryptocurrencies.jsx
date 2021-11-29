import React, { useEffect } from "react";
import { Col, Row, Card, Input } from "antd";
import { Link } from "react-router-dom";
import millify from "millify";
import Loading from "./Loading";
import { useGetCryptosQuery } from "../services/cryptoApi";
const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [searchTerm, setSearchIerm] = React.useState("");
  const [cryptos, setCryptos] = React.useState(cryptoList?.data?.coins);
  useEffect(() => {
    const listFilter = cryptoList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setCryptos(listFilter)
  }, [searchTerm, cryptoList]);
  if (isFetching) return <Loading />;
  return (
    <div>
      {simplified ? null : (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchIerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          // {console.log(currency)}
          <Col xa={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Cryptocurrencies;

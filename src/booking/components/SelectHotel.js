import React, { useState, useCallback, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Grid, Loader, Container } from 'semantic-ui-react';

import Filters from './Filters';
import SortBar from './SortBar';
import HotelsList from './HotelsList';
import ChartSwitcher from './ChartSwitcher';
import RatingChart from './RatingChart';

import { ONLINE_URL, BEDS_TYPE } from '../../utils/const';

const SelectHotel = props => {
  const [sortField, setField] = useState('price');
  const [bedsTypeFilter, setBedType] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChartVisible, setChartVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(ONLINE_URL);
      setIsLoading(false);
      setData(result.data.list.slice(0, 20));
    }
    fetchData()
  }, []);

  const setBedTypeFilter = useCallback(
    (value, checked) =>
      setBedType({
        ...bedsTypeFilter,
        [value]: checked
      }),
      [bedsTypeFilter]
  )

  const hotelsInFilter = useMemo(() => countHotelsByBedType(data), [data])
  const filteredHotels = useMemo(() => applyFilter(bedsTypeFilter, data), [bedsTypeFilter, data])
  const sortedHotels = useMemo(() => applySort(filteredHotels, sortField), [filteredHotels, sortField])
  const chartData = useMemo(() => prepareChartData(filteredHotels), [filteredHotels])

  return (
    <Container>
      <SortBar sortField={sortField} setField={setField} />
      <Layout>
        <Layout.Sidebar>
          <ChartSwitcher isChartVisible={isChartVisible} switchChartVisible={setChartVisible} />
          <Filters count={hotelsInFilter} onChange={setBedTypeFilter} />
        </Layout.Sidebar>
        <Layout.Feed isLoading={isLoading}>
          {isChartVisible && <RatingChart data={chartData} />}
          {isLoading ? (
            <Loader active inline="centered" />
          ) : (
              <HotelsList hotels={sortedHotels} selectHotel={noop} />
            )}
        </Layout.Feed>
      </Layout>
    </Container>
  );
};

const noop = () => { };

function countHotelsByBedType(data) {
  return data.reduce(function (acc, v) {
    acc[v.room] = acc[v.room] ? acc[v.room] + 1 : 1;
    return acc;
  }, {});
}

function applyFilter(filters, data) {
  const isFilterSet = BEDS_TYPE.find(b => filters[b.value]);
  if (!isFilterSet) {
    return data;
  }
  const filtered = data.filter(h => filters[h.room]);
  return filtered;
}

function prepareChartData(hotels) {
  return hotels.map(h => ({
    rating: +h.rating.average,
    price: +h.price.amount,
    reviews: +h.rating.reviews,
    name: h.title,
  }));
}
const sortHotels = {
  price: (a, b) => a.price.amount - b.price.amount,
  rating: (a, b) => b.rating.average - a.rating.average,
  reviews: (a, b) => b.rating.reviews - a.rating.reviews,
};

function applySort(hotels, sortField) {
  return hotels.sort(sortHotels[sortField]).concat([]);
}

const Layout = ({ children }) => (
  <Grid stackable divided>
    <Grid.Row>{children}</Grid.Row>
  </Grid>
);
const Sidebar = ({ children }) => (
  <Grid.Column width={4}>{children}</Grid.Column>
);

const Feed = ({ children }) => <Grid.Column width={12}>{children}</Grid.Column>;

Layout.Sidebar = Sidebar;
Layout.Feed = Feed;

export default SelectHotel;

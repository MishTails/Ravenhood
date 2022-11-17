import React, { useEffect, useState } from 'react';
import MainStockGraph from '../MainStockGraph';
import './StockDashBoard.css';
import { useParams } from 'react-router-dom';
import WatchlistAddList from '../WatchlistAddList';
import { GetCompanyOverview } from '../../utils/fetchStockFunctions';

function StockDashBoard() {
	const { ticker } = useParams();
	const [companyOverview, setCompanyOverview] = useState(null);
	useEffect(() => {
		const companyInfo = async () => {
			const companyInfo = await GetCompanyOverview(ticker);
			setCompanyOverview(companyInfo);
		};
		companyInfo();
	}, []);

	if (!companyOverview) return null;

	return (
		<div className="stock-dashboard-wrapper">
			<div className="stock-dashboard-inner-wrapper">
				<div className="stock-dashboard-inner-left">
					<div id="Company-name">{companyOverview.Name}</div>
					<div className="stock-dashboard-graph-wrapper">
						<MainStockGraph />
					</div>
					<div className="stock-dashboard-inner-left-borders">
						<div className="stock-holding-wrapper"></div>
						<div className="section-title">About</div>
						<div id="company-description">{companyOverview.Description}</div>
						<div className="section-title">Key statistics</div>
					</div>
				</div>
				<div className="stock-dashboard-right-wrapper">
					{/* <div className="stock-dashboard-buy-sell-wrapper">sdfsd</div> */}
					<WatchlistAddList symbol={ticker} />
				</div>
			</div>
		</div>
	);
}

export default StockDashBoard;

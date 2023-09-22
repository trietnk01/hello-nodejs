import { TableCell, TableRow } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import React from "react";
type DataTableLoadingProp = {
	isLoading: boolean;
	data: any;
	numColumn: number;
};

const DataTableLoading: React.FC<DataTableLoadingProp> = ({ isLoading, data, numColumn }) => {
	let node: React.ReactNode = <React.Fragment></React.Fragment>;
	const numRows: number = 6;
	if (isLoading) {
		node = Array.apply(null, Array(numRows)).map((x, index) => {
			return (
				<TableRow key={index}>
					{Array.apply(null, Array(numColumn)).map((x2, index2) => (
						<TableCell key={index2}>
							<Skeleton variant="text" animation="wave" sx={{ fontSize: "1rem" }} />
						</TableCell>
					))}
				</TableRow>
			);
		});
	} else {
		node = data;
	}
	return <React.Fragment>{node}</React.Fragment>;
};

export default DataTableLoading;

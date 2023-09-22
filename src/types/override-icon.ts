import React, { FunctionComponent, ReactElement } from "react";
import { SvgIconTypeMap, SnackbarOrigin, ChipProps, TableCellProps } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { TablerIcon } from "@tabler/icons";
export type OverrideIcon =
	| (OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
			muiName: string;
	  })
	| React.ComponentClass<any>
	| FunctionComponent<any>
	| TablerIcon;

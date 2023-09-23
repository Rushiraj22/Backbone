import React from 'react';
import { TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent, Timeline } from '@mui/lab';
import BoxComponent from '../muiBox/muiBox';
import MUIGrid from '../muiGrid/muiGrid';
import CustomTypography from '../typography/typography';

interface CustomTimelineItemProps {
    data: any;
}

const MUITimeline: React.FC<CustomTimelineItemProps> = ({ data }) => {
    return (
        <>
            {data.map((item: any, index: any) => (
                <Timeline sx={{ my: 0, py: 0 }}>
                    <TimelineItem key={index}>
                        <TimelineSeparator>
                            <TimelineDot color="error" />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: 0, overflow: "hidden", mb: (theme) => `${theme.spacing(2)} !important` }}>
                            <BoxComponent sx={{ mb: 3, display: "flex", flexWrap: "wrap", alignItems: "center" }}>
                                <MUIGrid item xs={12} sm={6}>
                                    <CustomTypography sx={{ mr: 2, fontWeight: 600 }}>{item.status}</CustomTypography>
                                </MUIGrid>
                                <CustomTypography variant="caption" sx={{ color: "text.disabled" }}>
                                    {item.date}
                                </CustomTypography>
                            </BoxComponent>
                            <CustomTypography variant="body2" sx={{ mb: 2 }}>
                                {item.date}
                            </CustomTypography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            ))}
        </>


    );

};

export default MUITimeline;
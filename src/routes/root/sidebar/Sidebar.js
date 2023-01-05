import React from 'react';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Card, Collapse, Paper, Tooltip } from '@mui/material';
import { Box } from '@mui/system';

import { useRoot } from '../Root';

function CollapseButton() {
    const { sidebarExpanded, setSidebarExpanded } = useRoot();
    return (
        <Tooltip
            title={(sidebarExpanded ? 'Collapse' : 'Expand') + ' side panel'}>
            <Card
                sx={{
                    position: 'absolute',
                    top: 8,
                    height: 48,
                    right: -23,
                    width: 23,
                    borderRadius: 2,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'text.secondary',
                    cursor: 'pointer',
                    zIndex: theme => theme.zIndex.sidebar - 1,
                }}
                onClick={() => setSidebarExpanded(!sidebarExpanded)}>
                {sidebarExpanded ? <ChevronLeft /> : <ChevronRight />}
            </Card>
        </Tooltip>
    );
}

const MemoizedCollapseButton = React.memo(CollapseButton);

export default function Sidebar({ children }) {
    const { sidebarExpanded } = useRoot();
    return (
        <Box position="relative">
            <Collapse
                orientation="horizontal"
                in={sidebarExpanded}
                unmountOnExit
                mountOnEnter>
                <Paper
                    elevation={1}
                    sx={{
                        position: 'relative',
                        fontSize: '0.95em',
                        zIndex: theme => theme.zIndex.sidebar,
                        transition: 'width 0.2s',
                    }}>
                    <React.Fragment>{children}</React.Fragment>
                </Paper>
            </Collapse>
            <MemoizedCollapseButton />
        </Box>
    );
}

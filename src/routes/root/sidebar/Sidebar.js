import React from 'react';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Card, Paper, Tooltip } from '@mui/material';
import Scrollbars from 'react-custom-scrollbars';

import Search from '../Search';

function CollapseButton({ open, setOpen }) {
    return (
        <Tooltip title={(open ? 'Collapse' : 'Expand') + ' side panel'}>
            <Card
                sx={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
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
                }}
                onClick={() => setOpen(!open)}>
                {open ? <ChevronLeft /> : <ChevronRight />}
            </Card>
        </Tooltip>
    );
}

const MemoizedCollapseButton = React.memo(CollapseButton);

export default function Sidebar({
    hovered,
    setHovered,
    sidebarOpen,
    setSidebarOpen,
}) {
    return (
        <Paper
            elevation={1}
            sx={{
                position: 'relative',
                flexBasis: sidebarOpen ? 350 : 0,
                flexGrow: 0,
                flexShrink: 0,
                fontSize: '0.95em',
                zIndex: 6,
            }}>
            <MemoizedCollapseButton
                open={sidebarOpen}
                setOpen={setSidebarOpen}
            />
            {sidebarOpen && (
                <Scrollbars style={{ height: 'calc(100vh - 49px)' }} autoHide>
                    <Search hovered={hovered} setHovered={setHovered} />
                </Scrollbars>
            )}
        </Paper>
    );
}

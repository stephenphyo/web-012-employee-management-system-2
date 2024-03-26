import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

/*** CSS Imports ***/
import './Table.css';

/*** Context ***/
const TableContext = createContext();

/*** Table ***/
function Table(props) {
    /* Initialization */
    const minCellWidth = 40;

    /* useRef */
    const tableRef = useRef(null);
    const headingsRef = useRef([]);

    /* useState */
    const [tableHeight, setTableHeight] = useState('auto');
    const [activeIndex, setActiveIndex] = useState(null);
    const [numColumns, setNumColumns] = useState(null);

    /* useCallback */
    const handleMouseMove = useCallback((e) => {
        const headingWidths = props.headings.map((_, index) => {
            if (index !== props.headings.length - 1) {
                // Get Current Active Column
                if (index === activeIndex) {
                    const eleRect = headingsRef.current[index]?.getBoundingClientRect();
                    const colWidth = e.clientX - eleRect.left;
                    if (colWidth <= minCellWidth) return `${minCellWidth}px`;
                    return `${colWidth}px`;
                }
                // Other Inactive Columns; No Changes
                return `${headingsRef.current[index].offsetWidth}px`;
            }
            return '100px';
        });
        console.log(headingWidths)
        // Assign the New Column Width Values to the Table
        tableRef.current.style.gridTemplateColumns = `${headingWidths.join(' ')}`;
    }, [activeIndex, props.headings, minCellWidth]);

    const removeListeners = useCallback((e) => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', removeListeners);
    }, [handleMouseMove]);

    const handleMouseUp = useCallback((e) => {
        setActiveIndex(null);
        removeListeners();
    }, [setActiveIndex, removeListeners]);

    /* useEffect */
    useEffect(() => {
        setNumColumns(props.numColumns);
    }, [props.numColumns]);

    useEffect(() => {
        if (!tableRef.current) return;

        const resizeObserver = new ResizeObserver(() => {
            if (tableRef.current.offsetHeight !== tableHeight) {
                setTableHeight(tableRef.current.offsetHeight);
            }
        });
        resizeObserver.observe(tableRef.current);
        return () => resizeObserver.disconnect();
    }, [tableRef, tableHeight]);

    useEffect(() => {
        var gridTemplateColumns = Array(numColumns).fill().map((_, index) => {
            return 'minmax(auto, 20rem)';
        });
        gridTemplateColumns = `${gridTemplateColumns.join(' ')}`;
        if (tableRef.current) {
            tableRef.current.style.gridTemplateColumns = gridTemplateColumns;
        }
    }, [numColumns]);

    useEffect(() => {
        if (activeIndex !== null) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => removeListeners();
    }, [activeIndex, handleMouseMove, handleMouseUp, removeListeners]);

    if (!props.numColumns) {
        return console.error('Number of Columns prop is not defined.');
    } else {
        return (
            <TableContext.Provider value={{ numColumns }}>
                <div className='table_wrapper'>
                    <table ref={tableRef}>
                        <thead>
                            <tr>
                                {Array(numColumns).fill().map((_, index) => (
                                    <th key={index}
                                        ref={ele => headingsRef.current[index] = ele}
                                        className='d-flex'>
                                        <span>{props?.headings ? props.headings[index] : ''}</span>
                                        <div
                                            style={{ height: tableHeight }}
                                            onMouseDown={() => setActiveIndex(index)}
                                            className={`resize_handle ${activeIndex === index ? 'active' : 'idle'}`}
                                        />
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {props.children}
                        </tbody>
                    </table>
                </div>
            </TableContext.Provider>
        );
    }
}

/*** Table Row ***/
function Row(props) {
    /* useState */
    const [numFilledElements, setNumFilledElements] = useState(null);

    /* useContext */
    const { numColumns } = useContext(TableContext);

    /* useEffect */
    useEffect(() => {
        // 'props.children' is not always an array.
        // If a component has only one child element, 'props.children' is the single child element itself.
        // Instead of 'props.children.length', use this:
        const numElements = React.Children.count(props.children);
        setNumFilledElements(Math.max(0, numColumns - numElements));
    }, [numColumns, props.children]);

    return (
        <tr {...props}>
            {props.children}
            {numFilledElements >= 0 &&
                Array(numFilledElements).fill().map((_, index) => (
                    <Data key={index} />
                ))}
        </tr>
    );
}

/*** Table Data ***/
function Data(props) {
    return (
        <td {...props}>
            <span>{props.children}</span>
        </td>
    );
}

Table.Row = Row;
Table.Data = Data;

export default Table;
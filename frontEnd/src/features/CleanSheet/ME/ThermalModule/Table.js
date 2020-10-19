import React, { Component } from 'react';
import styled from 'styled-components';
import Table from '~~elements/DataTable';
import TableHeaderColumn from '~~elements/DataTable/TableHeaderColumn';


export default class DataTable extends Component {
  render() {
    return (
      <div>
        <h4>{this.props.tableName}</h4>
        <Table rows={this.props.rows} headers={this.props.headers}>
          {({ rows, headers }) => {
            return (
              <div>
                <div className="table">
                  <div className="table-thead">
                    <div className="table-tr">
                      {headers.map(item => {
                        return (
                          <TableHeaderColumn
                            data={item}
                            onSortChange={this.onSortChange}
                            key={item.key}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className="table-tbody">
                    {rows.map(row => {
                      return (
                        <div className="table-tr">
                          {row.cells.map(cell => {
                            return (
                              <div className="table-td" key={cell.id}>
                                {cell.value}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })
                    }
                  </div>
                </div>
              </div>
            );
          }}
        </Table>
      </div>
    );
  }
}

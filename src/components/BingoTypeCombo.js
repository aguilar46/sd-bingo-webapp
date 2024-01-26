/**
 * Author: RSP Aguilar
 * Created Date: 2021-01-26T04:28:24.415Z
 */
//3rd party
import React, { useMemo } from 'react';
import _ from 'lodash';
//local
import { bingoTypes } from '../data';
import { getBingoTypeDisplayName } from '../util';
import { Combobox } from 'react-widgets';

const allTypes = Object.values(bingoTypes).map((value) => ({
  label: getBingoTypeDisplayName(value),
  value,
}));

const BingoTypeCombo = (props) => {
  const { excludeType } = props;

  const types = useMemo(
    () =>
      excludeType ? allTypes.filter((t) => t.value !== excludeType) : allTypes,
    [excludeType]
  );

  return (
    <Combobox
      {..._.omit(props, ['excludeType'])}
      data={types}
      dataKey="value"
      textField="label"
    />
  );
};

export default BingoTypeCombo;

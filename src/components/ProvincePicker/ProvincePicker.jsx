import React, { useState, useEffect } from "react";
import styles from './ProvincePicker.module.css';

const ProvincePicker = ({handleProvincePick, dataLoaded}) => {

  return (

    <form action="">
      <select  disabled={dataLoaded ? false : true } name="" id="" onChange={handleProvincePick}>
        <option value="Canada">Canada</option>
        <option value="Alberta">Alberta</option>
        <option value="British Columbia">British Columbia</option>
        <option value="Manitoba">Manitoba</option>
        <option value="New Brunswick">New Brunswick</option>
        <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
        <option value="Nova Scotia">Nova Scotia</option>
        <option value="Ontario">Ontario</option>
        <option value="Prince Edward Island">Prince Edward Island</option>
        <option value="Quebec">Quebec</option>
        <option value="Saskatchewan">Saskatchewan</option>
        <option value="Yukon">Yukon</option>

      </select>
    </form>
  );
};

export default ProvincePicker;

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

export const Widget = styled.div`
  padding: 20px;
  max-width: 600px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

export const Title = styled.h1`
  text-align: center;
`;

export const Input = styled.input`
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
`;

export const CommissionResultContainer = styled.div`
  margin-top: 20px;
`;

export const TotalCommission = styled.h2`
  text-align: center;
`;

export const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const BreakdownContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

export const BreakdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
`;

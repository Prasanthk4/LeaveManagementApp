import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable, Text } from 'react-native-paper';

const LeaveBalanceTable = ({ employeeId }) => {
  const [leaveBalances, setLeaveBalances] = useState([
    { type: 'Casual Leave (CL)', openingBalance: 10, availed: 0, remaining: 10 },
    { type: 'Earned Leave (EL)', openingBalance: 15, availed: 0, remaining: 15 },
    { type: 'Sick Leave (SL)', openingBalance: 7, availed: 0, remaining: 7 }
  ]);

  // In a real app, this would fetch from a backend or local storage
  useEffect(() => {
    // Simulating leave balance updates based on employee ID
    if (employeeId) {
      const updatedBalances = leaveBalances.map(balance => {
        // Simulate some leave usage based on employee ID
        const simulatedAvailed = employeeId.length % 3;
        return {
          ...balance,
          availed: simulatedAvailed,
          remaining: balance.openingBalance - simulatedAvailed
        };
      });
      setLeaveBalances(updatedBalances);
    }
  }, [employeeId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Year Leave Balance</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Leave Type</DataTable.Title>
          <DataTable.Title numeric>Opening</DataTable.Title>
          <DataTable.Title numeric>Availed</DataTable.Title>
          <DataTable.Title numeric>Remaining</DataTable.Title>
        </DataTable.Header>

        {leaveBalances.map((balance, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{balance.type}</DataTable.Cell>
            <DataTable.Cell numeric>{balance.openingBalance}</DataTable.Cell>
            <DataTable.Cell numeric>{balance.availed}</DataTable.Cell>
            <DataTable.Cell numeric>{balance.remaining}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  }
});

export default LeaveBalanceTable;

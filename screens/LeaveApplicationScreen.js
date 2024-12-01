import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { 
  TextInput, 
  Button, 
  Card, 
  Text,
  Menu,
  Modal,
  Portal,
  HelperText
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const LeaveApplicationScreen = () => {
  // Simplified Employee Data with only ID and Name
  const employeeData = [
    { employeeId: '101001', employeeName: 'Arjun Reddy' },
    { employeeId: '101002', employeeName: 'Priya Sharma' },
    { employeeId: '101003', employeeName: 'Vijay Kumar' },
    { employeeId: '101004', employeeName: 'Swetha Reddy' },
    { employeeId: '101005', employeeName: 'Rahul Verma' },
    { employeeId: '101006', employeeName: 'Anjali Gupta' },
    { employeeId: '101007', employeeName: 'Ramesh Babu' },
    { employeeId: '101008', employeeName: 'Sneha Agarwal' },
    { employeeId: '101009', employeeName: 'Abhishek Tiwari' },
    { employeeId: '101010', employeeName: 'Kavya S' },
    { employeeId: '101011', employeeName: 'Aditya Deshmukh' },
    { employeeId: '101012', employeeName: 'Nandini Rao' },
    { employeeId: '101013', employeeName: 'Vikas Choudhary' },
    { employeeId: '101014', employeeName: 'Megha Singh' },
    { employeeId: '101015', employeeName: 'Tarun Sharma' }
  ];

  // Employee Information State
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [employeeIdSuggestions, setEmployeeIdSuggestions] = useState([]);
  const [employeeNameSuggestions, setEmployeeNameSuggestions] = useState([]);

  // Date Modal States
  const [showApplyDatePicker, setShowApplyDatePicker] = useState(false);
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

  // Leave Details State
  const [leaveType, setLeaveType] = useState('');
  const [leaveTypeMenuVisible, setLeaveTypeMenuVisible] = useState(false);
  const [applyDate, setApplyDate] = useState(new Date());
  const [fromSession, setFromSession] = useState('');
  const [toSession, setToSession] = useState('');
  const [fromSessionMenuVisible, setFromSessionMenuVisible] = useState(false);
  const [toSessionMenuVisible, setToSessionMenuVisible] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');

  // Approver Section State
  const [approvingAuthority, setApprovingAuthority] = useState('');
  const approvingAuthorities = [
    { id: 'MGR001', name: 'Rajesh Kumar', department: 'HR' },
    { id: 'MGR002', name: 'Priya Malhotra', department: 'Operations' },
    { id: 'MGR003', name: 'Sanjay Gupta', department: 'Finance' },
    { id: 'MGR004', name: 'Anita Sharma', department: 'IT' },
    { id: 'MGR005', name: 'Vikram Singh', department: 'Sales' }
  ];
  const [selectedAuthority, setSelectedAuthority] = useState(null);
  const [isAuthorityModalVisible, setIsAuthorityModalVisible] = useState(false);

  // Leave Balance Data for Employees
  const leaveBalances = {
    '101001': { // Arjun Reddy
      leaveBalance: [
        { leaveType: 'CL', fullName: 'Casual Leave', opening: 12, availed: 3, balance: 9 },
        { leaveType: 'EL', fullName: 'Earned Leave', opening: 18, availed: 5, balance: 13 },
        { leaveType: 'SL', fullName: 'Sick Leave', opening: 10, availed: 2, balance: 8 }
      ]
    },
    '101002': { // Priya Sharma
      leaveBalance: [
        { leaveType: 'CL', fullName: 'Casual Leave', opening: 12, availed: 6, balance: 6 },
        { leaveType: 'EL', fullName: 'Earned Leave', opening: 18, availed: 5, balance: 13 },
        { leaveType: 'SL', fullName: 'Sick Leave', opening: 10, availed: 2, balance: 8 }
      ]
    },
    '101003': { // Vijay Kumar
      leaveBalance: [
        { leaveType: 'CL', fullName: 'Casual Leave', opening: 15, availed: 5, balance: 10 },
        { leaveType: 'EL', fullName: 'Earned Leave', opening: 20, availed: 7, balance: 13 },
        { leaveType: 'SL', fullName: 'Sick Leave', opening: 10, availed: 2, balance: 8 }
      ]
    },
    '101004': { // Swetha Reddy
      leaveBalance: [
        { leaveType: 'CL', fullName: 'Casual Leave', opening: 12, availed: 6, balance: 6 },
        { leaveType: 'EL', fullName: 'Earned Leave', opening: 20, availed: 7, balance: 13 },
        { leaveType: 'SL', fullName: 'Sick Leave', opening: 8, availed: 3, balance: 5 }
      ]
    },
    '101005': { // Rahul Verma
      leaveBalance: [
        { leaveType: 'CL', fullName: 'Casual Leave', opening: 15, availed: 5, balance: 10 },
        { leaveType: 'EL', fullName: 'Earned Leave', opening: 18, availed: 4, balance: 14 },
        { leaveType: 'SL', fullName: 'Sick Leave', opening: 10, availed: 2, balance: 8 }
      ]
    },
    '101006': { // Anjali Gupta
      leaveBalance: [
        { leaveType: 'CL', fullName: 'Casual Leave', opening: 12, availed: 6, balance: 6 },
        { leaveType: 'EL', fullName: 'Earned Leave', opening: 18, availed: 3, balance: 15 },
        { leaveType: 'SL', fullName: 'Sick Leave', opening: 8, availed: 3, balance: 5 }
      ]
    },
    '101007': { // Ramesh Babu
      leaveBalance: [
        { leaveType: 'CL', fullName: 'Casual Leave', opening: 15, availed: 5, balance: 10 },
        { leaveType: 'EL', fullName: 'Earned Leave', opening: 18, availed: 3, balance: 15 },
        { leaveType: 'SL', fullName: 'Sick Leave', opening: 10, availed: 4, balance: 6 }
      ]
    },
    '101008': { // Sneha Agarwal
      leaveBalance: [
        { leaveType: 'CL', fullName: 'Casual Leave', opening: 10, availed: 2, balance: 8 },
        { leaveType: 'EL', fullName: 'Earned Leave', opening: 18, availed: 3, balance: 15 },
        { leaveType: 'SL', fullName: 'Sick Leave', opening: 10, availed: 4, balance: 6 }
      ]
    },
    '101009': { // Abhishek Tiwari
      leaveBalance: [
        { leaveType: 'CL', fullName: 'Casual Leave', opening: 12, availed: 3, balance: 9 },
        { leaveType: 'EL', fullName: 'Earned Leave', opening: 20, availed: 6, balance: 14 },
        { leaveType: 'SL', fullName: 'Sick Leave', opening: 10, availed: 2, balance: 8 }
      ]
    },
    '101010': { // Kavya S
      leaveBalance: [
        { leaveType: 'CL', fullName: 'Casual Leave', opening: 10, availed: 2, balance: 8 },
        { leaveType: 'EL', fullName: 'Earned Leave', opening: 18, availed: 3, balance: 15 },
        { leaveType: 'SL', fullName: 'Sick Leave', opening: 8, availed: 1, balance: 7 }
      ]
    },
    '101011': { // Aditya Deshmukh
      leaveBalance: [
        { leaveType: 'CL', fullName: 'Casual Leave', opening: 12, availed: 4, balance: 8 },
        { leaveType: 'EL', fullName: 'Earned Leave', opening: 22, availed: 8, balance: 14 },
        { leaveType: 'SL', fullName: 'Sick Leave', opening: 10, availed: 3, balance: 7 }
      ]
    },
    '101012': { // Nandini Rao
      leaveBalance: [
        { leaveType: 'CL', fullName: 'Casual Leave', opening: 10, availed: 3, balance: 7 },
        { leaveType: 'EL', fullName: 'Earned Leave', opening: 18, availed: 5, balance: 13 },
        { leaveType: 'SL', fullName: 'Sick Leave', opening: 7, availed: 1, balance: 6 }
      ]
    },
    '101013': { // Vikas Choudhary
      leaveBalance: [
        { leaveType: 'CL', fullName: 'Casual Leave', opening: 15, availed: 4, balance: 11 },
        { leaveType: 'EL', fullName: 'Earned Leave', opening: 20, availed: 7, balance: 13 },
        { leaveType: 'SL', fullName: 'Sick Leave', opening: 8, availed: 3, balance: 5 }
      ]
    },
    '101014': { // Megha Singh
      leaveBalance: [
        { leaveType: 'CL', fullName: 'Casual Leave', opening: 12, availed: 6, balance: 6 },
        { leaveType: 'EL', fullName: 'Earned Leave', opening: 18, availed: 4, balance: 14 },
        { leaveType: 'SL', fullName: 'Sick Leave', opening: 10, availed: 2, balance: 8 }
      ]
    },
    '101015': { // Tarun Sharma
      leaveBalance: [
        { leaveType: 'CL', fullName: 'Casual Leave', opening: 9, availed: 3, balance: 6 },
        { leaveType: 'EL', fullName: 'Earned Leave', opening: 18, availed: 2, balance: 16 },
        { leaveType: 'SL', fullName: 'Sick Leave', opening: 8, availed: 1, balance: 7 }
      ]
    }
  };

  // State for selected employee's leave balance
  const [selectedEmployeeLeaveBalance, setSelectedEmployeeLeaveBalance] = useState({
    leaveBalance: []
  });

  // Update leave balance when employee is selected
  useEffect(() => {
    if (employeeId && leaveBalances[employeeId]) {
      setSelectedEmployeeLeaveBalance(leaveBalances[employeeId]);
    } else {
      setSelectedEmployeeLeaveBalance({
        leaveBalance: []
      });
    }
  }, [employeeId]);

  // Handle Employee ID Input
  const handleEmployeeIdChange = (text) => {
    setEmployeeId(text);
    
    // Filter suggestions based on input
    const suggestions = employeeData.filter(
      emp => emp.employeeId.toLowerCase().includes(text.toLowerCase())
    );
    
    setEmployeeIdSuggestions(suggestions);
  };

  // Handle Employee Name Input
  const handleEmployeeNameChange = (text) => {
    setEmployeeName(text);
    
    // Filter suggestions based on input
    const suggestions = employeeData.filter(
      emp => emp.employeeName.toLowerCase().includes(text.toLowerCase())
    );
    
    setEmployeeNameSuggestions(suggestions);
  };

  // Select Employee from Suggestions
  const selectEmployee = (employee) => {
    setEmployeeId(employee.employeeId);
    setEmployeeName(employee.employeeName);
    
    // Clear suggestions
    setEmployeeIdSuggestions([]);
    setEmployeeNameSuggestions([]);
  };

  // Date Selection Handlers
  const handleApplyDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || applyDate;
    setShowApplyDatePicker(Platform.OS === 'ios');
    setApplyDate(currentDate);
  };

  const handleFromDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setShowFromDatePicker(Platform.OS === 'ios');
    setFromDate(currentDate);
  };

  const handleToDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setShowToDatePicker(Platform.OS === 'ios');
    setToDate(currentDate);
  };

  // Form Submission Handler
  const handleSubmit = () => {
    // Validate form
    if (!employeeId || !leaveType || !reason || !fromSession || !toSession) {
      alert('Please fill in all required fields');
      return;
    }

    // Prepare submission data
    const leaveApplication = {
      employeeId,
      employeeName,
      leaveType,
      applyDate: applyDate.toLocaleDateString(),
      fromDate,
      toDate,
      fromSession,
      toSession,
      reason,
      numberOfDays,
      approvingAuthority
    };

    // Log or send to backend
    console.log('Leave Application:', leaveApplication);
    alert('Leave application submitted successfully!');

    // Clear form after submission
    handleClear();
  };

  // Clear Form Handler
  const handleClear = () => {
    setEmployeeId('');
    setEmployeeName('');
    setLeaveType('');
    setFromSession('');
    setToSession('');
    setReason('');
    setNumberOfDays('');
    setApplyDate(new Date());
    setFromDate('');
    setToDate('');
  };

  // Render Dropdown Menu Component
  const renderDropdownMenu = (
    visible, 
    setVisible, 
    value, 
    setValue, 
    options, 
    placeholder
  ) => {
    const handleItemPress = (option) => {
      setValue(option.label);
      setVisible(false);
    };

    return (
      <View>
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <TouchableOpacity 
              onPress={() => {
                // Close other dropdowns
                setLeaveTypeMenuVisible(false);
                setFromSessionMenuVisible(false);
                setToSessionMenuVisible(false);
                
                // Open current dropdown
                setVisible(true);
              }}
            >
              <TextInput
                label={placeholder}
                value={value}
                editable={false}
                style={styles.input}
                right={<TextInput.Icon name="menu-down" />}
              />
            </TouchableOpacity>
          }
        >
          {options.map((option) => (
            <Menu.Item
              key={option.value}
              onPress={() => handleItemPress(option)}
              title={option.label}
            />
          ))}
        </Menu>
      </View>
    );
  };

  // Render Date Input with Modal Calendar
  const renderDateInput = (
    label, 
    date, 
    showPicker, 
    setShowPicker, 
    onDateChange
  ) => (
    <View style={styles.dateContainer}>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TextInput
          label={label}
          value={date.toLocaleDateString()}
          editable={false}
          style={styles.input}
          right={<TextInput.Icon name="calendar" />}
        />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          testID={`${label}-datepicker`}
          value={date}
          mode="date"
          display="calendar"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (event.type === 'set') {
              onDateChange(event, selectedDate);
            }
          }}
        />
      )}
    </View>
  );

  // Handle selecting an approving authority
  const handleSelectAuthority = (authority) => {
    setApprovingAuthority(authority.name);
    setSelectedAuthority(authority);
    setIsAuthorityModalVisible(false);
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Leave Balance Section */}
      <Card style={styles.leaveBalanceCard}>
        <Card.Title title="Current Year Leave Balance" />
        <Card.Content>
          <View style={styles.leaveBalanceHeader}>
            <Text style={[styles.leaveBalanceCell, styles.headerCell]}>Leave Type</Text>
            <Text style={[styles.leaveBalanceCell, styles.headerCell]}>Opening</Text>
            <Text style={[styles.leaveBalanceCell, styles.headerCell]}>Availed</Text>
            <Text style={[styles.leaveBalanceCell, styles.headerCell]}>Balance</Text>
          </View>
          {selectedEmployeeLeaveBalance.leaveBalance.length > 0 ? (
            selectedEmployeeLeaveBalance.leaveBalance.map((balance, index) => (
              <View key={index} style={styles.leaveBalanceRow}>
                <Text style={styles.leaveBalanceCell}>{balance.fullName} ({balance.leaveType})</Text>
                <Text style={styles.leaveBalanceCell}>{balance.opening}</Text>
                <Text style={styles.leaveBalanceCell}>{balance.availed}</Text>
                <Text style={styles.leaveBalanceCell}>{balance.balance}</Text>
              </View>
            ))
          ) : (
            <View style={styles.noEmployeeSelected}>
              <Text style={styles.noEmployeeSelectedText}>
                Select an Employee to View Leave Balance
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>

      {/* Employee Information Section */}
      <TextInput
        label="Employee ID"
        value={employeeId}
        onChangeText={handleEmployeeIdChange}
        style={styles.input}
        required
      />
      {employeeIdSuggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {employeeIdSuggestions.map((employee) => (
            <TouchableOpacity 
              key={employee.employeeId} 
              onPress={() => selectEmployee(employee)}
            >
              <Text style={styles.suggestion}>{employee.employeeId}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <TextInput
        label="Employee Name"
        value={employeeName}
        onChangeText={handleEmployeeNameChange}
        style={styles.input}
      />
      {employeeNameSuggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {employeeNameSuggestions.map((employee) => (
            <TouchableOpacity 
              key={employee.employeeId} 
              onPress={() => selectEmployee(employee)}
            >
              <Text style={styles.suggestion}>{employee.employeeName}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Leave Details Section */}
      {/* Leave/On Duty Dropdown */}
      {renderDropdownMenu(
        leaveTypeMenuVisible,
        setLeaveTypeMenuVisible,
        leaveType,
        setLeaveType,
        [
          { label: 'Casual Leave (CL)', value: 'CL' },
          { label: 'Earned Leave (EL)', value: 'EL' },
          { label: 'Sick Leave (SL)', value: 'SL' },
          { label: 'Loss of Pay (LOP)', value: 'LOP' }
        ],
        "Leave/On Duty"
      )}

      {/* Apply Date */}
      {renderDateInput(
        "Apply Date",
        applyDate,
        showApplyDatePicker,
        setShowApplyDatePicker,
        handleApplyDateChange
      )}

      {/* From Session Dropdown */}
      {renderDropdownMenu(
        fromSessionMenuVisible,
        setFromSessionMenuVisible,
        fromSession,
        setFromSession,
        [
          { label: '1st Session', value: '1ST' },
          { label: '2nd Session', value: '2ND' }
        ],
        "From Session"
      )}

      {/* To Session Dropdown */}
      {renderDropdownMenu(
        toSessionMenuVisible,
        setToSessionMenuVisible,
        toSession,
        setToSession,
        [
          { label: '1st Session', value: '1ST' },
          { label: '2nd Session', value: '2ND' }
        ],
        "To Session"
      )}

      {/* From Date */}
      <TextInput
        label="From Date"
        value={fromDate}
        onChangeText={(text) => {
          // Validate and parse the date
          const datePattern = /^\d{4}\/\d{2}\/\d{2}$/;
          if (datePattern.test(text)) {
            const [year, month, day] = text.split('/').map(Number);
            const parsedDate = new Date(year, month - 1, day);
            
            // Validate the date is valid
            if (!isNaN(parsedDate.getTime())) {
              setFromDate(text);
            } else {
              // Optional: Add error handling
              alert('Invalid date. Please use yyyy/mm/dd format.');
            }
          } else {
            setFromDate(text);
          }
        }}
        keyboardType="numeric"
        style={styles.input}
        placeholder="yyyy/mm/dd"
      />

      {/* To Date */}
      <TextInput
        label="To Date"
        value={toDate}
        onChangeText={(text) => {
          // Validate and parse the date
          const datePattern = /^\d{4}\/\d{2}\/\d{2}$/;
          if (datePattern.test(text)) {
            const [year, month, day] = text.split('/').map(Number);
            const parsedDate = new Date(year, month - 1, day);
            
            // Validate the date is valid
            if (!isNaN(parsedDate.getTime())) {
              setToDate(text);
            } else {
              // Optional: Add error handling
              alert('Invalid date. Please use yyyy/mm/dd format.');
            }
          } else {
            setToDate(text);
          }
        }}
        keyboardType="numeric"
        style={styles.input}
        placeholder="yyyy/mm/dd"
      />

      {/* Reason Input */}
      <TextInput
        label="Reason"
        value={reason}
        onChangeText={setReason}
        style={[styles.input, { height: 100 }]}
        multiline={true}
        numberOfLines={3}
        placeholder="Enter your reason for leave"
      />

      {/* Number of Days */}
      <TextInput
        label="No. of Days"
        value={numberOfDays}
        onChangeText={setNumberOfDays}
        keyboardType="numeric"
        style={styles.input}
      />

      {/* Approver Section */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Approving Authority</Text>
        <TouchableOpacity onPress={() => setIsAuthorityModalVisible(true)}>
          <TextInput
            style={styles.input}
            value={approvingAuthority}
            editable={false}
            placeholder="Select Approving Authority"
            placeholderTextColor="#888"
          />
        </TouchableOpacity>
        <HelperText type="info" visible={true}>
          Select the manager who will review and approve your leave request
        </HelperText>
        <Modal
          visible={isAuthorityModalVisible}
          onDismiss={() => setIsAuthorityModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Approving Authority</Text>
              {approvingAuthorities.map((authority) => (
                <TouchableOpacity 
                  key={authority.id} 
                  onPress={() => handleSelectAuthority(authority)}
                >
                  <Text style={styles.suggestion}>{authority.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={handleSubmit} 
          style={styles.button}
        >
          Submit
        </Button>
        <Button 
          mode="outlined" 
          onPress={handleClear} 
          style={styles.button}
        >
          Clear All
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
  leaveBalanceCard: {
    marginBottom: 16,
  },
  leaveBalanceHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  leaveBalanceRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  leaveBalanceCell: {
    flex: 1,
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
  },
  dateContainer: {
    marginBottom: 12,
  },
  dropdownContainer: {
    marginBottom: 12,
  },
  dropdownContent: {
    maxHeight: 200,
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxHeight: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  suggestionsContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  suggestion: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  noEmployeeSelected: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 12,
  },
  noEmployeeSelectedText: {
    textAlign: 'center',
    color: '#666',
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default LeaveApplicationScreen;

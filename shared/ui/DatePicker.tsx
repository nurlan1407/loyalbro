import React from "react";
import { View, } from "react-native"
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';


interface DatePickerProps {
    date: Date,
    handleDateChange: (event: DateTimePickerEvent, date?: Date) => void
}

const DatePicker: React.FC<DatePickerProps> = ({
    date,
    handleDateChange
}) => {

    return (
        <DateTimePicker
            testID="dateTimePicker"
            value={date}
            // mode={mode}
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
        >

        </DateTimePicker>
    )
}

export default DatePicker
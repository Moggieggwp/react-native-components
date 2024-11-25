import React, { FC, useMemo } from 'react';
import { Platform, Text, View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import * as svg from 'assets/svg';
import { RecurringTypeEnum, TimeSlot } from 'src/models/experience';
import { getDateForTimeSlot, getMultipleDates, getTimeSlotTime } from 'src/helpers/timeSlot';
import Colors from 'src/constants/colors';
import fontsConfig from 'src/constants/fonts';

type Props = {
  timeSlot: TimeSlot;
  recurringType?: RecurringTypeEnum;
  hasMultipleSlots?: boolean;
  standartSlotFormatting?: string;
};

const DateTitle: FC<Props> = ({
  timeSlot,
  recurringType = RecurringTypeEnum.STANDARD,
  hasMultipleSlots,
  standartSlotFormatting = 'dddd, D MMM',
}) => {
  if (!timeSlot) return null;
  const isStandardDate = recurringType == RecurringTypeEnum.STANDARD;

  const date = useMemo(
    () => (isStandardDate ? getDateForTimeSlot(timeSlot, standartSlotFormatting) : getMultipleDates(timeSlot)),
    [timeSlot],
  );

  const time = useMemo(() => getTimeSlotTime(timeSlot), [timeSlot]);

  return (
    <View style={styles.dateContainer}>
      <View style={styles.dateLabelWrap}>
        {hasMultipleSlots && <Text style={[styles.commonDateText, styles.dateText]}>Next:</Text>}
        <svg.calendarIcon
          width={scale(12)}
          height={scale(12)}
          style={styles.dateIcon}
          color={Colors.primaryBlue}
        />
        <Text style={[styles.commonDateText, styles.dateText]}>{date}</Text>
      </View>

      {isStandardDate && (
        <>
          <svg.clockIcon style={styles.timeIcon} width={scale(12)} height={scale(12)} color={Colors.primaryBlue} />
          <Text style={styles.commonDateText}>
            {time.startTime} - {time.endTime}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  dateContainer: {
    marginTop: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    marginRight: 8,
  },
  timeIcon: {
    marginRight: 8,
  },
  dateText: {
    marginRight: 16,
  },
  commonDateText: {
    fontSize: 15,
    color: Colors.primaryBlue,
    ...fontsConfig.regularDia,
    fontWeight: '400',
    lineHeight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DateTitle;

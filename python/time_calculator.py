def add_time(start_time, duration, starting_day='None') :
    
		#start time
		s = start_time.split(":")	
		start_hour = int(s[0])
		rawMinutes = s[1].split(' ')
		start_min = int(rawMinutes[0])
		am_pm = rawMinutes[1]
    
    #duration time
		duration_hours, duration_min = duration.split(":")		
		#print(duration_hours, duration_min)

		start_hour = int(start_hour)
		start_min = int(start_min)
		duration_hours = int(duration_hours)
		duration_min = int(duration_min)
		#duration_days = int(duration_days)

		#convert start hrto 24 hr format
		if am_pm == 'PM' and start_hour != 12:
				start_hour += 12
		elif am_pm == 'AM' and start_hour == 12:
				start_hour = 0

		#calculate total duration in minutes
		duration_days = 0
		total_minutes = start_hour * 60 + start_min + duration_min + duration_hours * 60
		if duration_days:
				total_minutes += duration_days * 24 * 60


		#calculate end hour, end minutes and days
		end_hour = (total_minutes // 60) % 24
		end_min = total_minutes % 60
		end_day = total_minutes // (24 * 60)

		#convert end hour back to 12-hour format
		if end_hour >= 12:
				am_pm = 'PM'
				if end_hour > 12:
						end_hour -= 12
		else:
				am_pm = 'AM'
				if end_hour == 0:
						end_hour = 12

		#determine if the result is the next day or multiple days later
		next_day = end_day == 1
		multiple_days = end_day > 1

		#get the day of the week if the starting day is provided
		if starting_day:
				days_of_the_week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
				
				starting_day = starting_day.capitalize()		#capitalize the starting day

				if starting_day in days_of_the_week:
						start_day_index = days_of_the_week.index(starting_day)
						end_day_index = (start_day_index + end_day) % 7
						day_of_the_week = days_of_the_week[end_day_index]
						new_time =  f'{end_hour:02d}:{end_min:02d} {am_pm}, {day_of_the_week}'

						if next_day:
								new_time += ' (next day)'
						elif multiple_days: 
								new_time += f' ({end_day} days later)'
				else:
						new_time =  f'{end_hour:02d}:{end_min:02d} {am_pm}'

						if next_day:
								new_time += ' (next day)'
						elif multiple_days:
								new_time += f' ({end_day} days later)'
		else:
				new_time =  f'{end_hour:02d}:{end_min:02d} {am_pm}'

				if next_day:
						new_time += ' (next day)'
				elif multiple_days:
						new_time += f' ({end_day} days later)'
		print(new_time)
		return(new_time)
		
add_time("01:00 AM", "12:33", "Monday")

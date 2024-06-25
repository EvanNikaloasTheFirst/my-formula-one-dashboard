from flask import Flask, jsonify
import requests
import xml.etree.ElementTree as ET
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/home', methods=['GET'])
def fetch_f1_results():
    # Fetch latest F1 results
    results_url = "http://ergast.com/api/f1/current/last/results.xml?limit=3"
    response = requests.get(results_url)
    
    if response.status_code == 200:
        xml_data = response.content
        root = ET.fromstring(xml_data)
        
        namespaces = {'mrd': 'http://ergast.com/mrd/1.5'}
        
        # Initialize variables to store data
        driversNames = []
        drivers_times = []
        sessions_Details = []
        driver_start = []
        drivers = []
        pointsTable = []

        # Process F1 results data
        race_table = root.find('mrd:RaceTable', namespaces)
        if race_table is not None:
            race = race_table.find('mrd:Race', namespaces)
            if race is not None:
                circuit_name = race.find('mrd:Circuit/mrd:CircuitName', namespaces).text
                location = race.find('mrd:Circuit/mrd:Location', namespaces)
                country = location.find('mrd:Country', namespaces).text

                sessions_Details.append(country)
                sessions_Details.append(circuit_name)

                results_list = race.find('mrd:ResultsList', namespaces)
                if results_list is not None:
                    results = results_list.findall('mrd:Result', namespaces)
                    for result in results:
                        driver = result.find('mrd:Driver', namespaces)
                        if driver is not None:
                            driver_name = f"{driver.find('mrd:GivenName', namespaces).text} {driver.find('mrd:FamilyName', namespaces).text}"
                            driversNames.append(driver_name)
                        
                        time = result.find('mrd:Time', namespaces)
                        race_time = time.text if time is not None else 'N/A'
                        drivers_times.append(race_time)

                        grid = result.find('mrd:Grid', namespaces).text
                        driver_start.append(grid)
    
    else:
        print(f"Failed to fetch results data. Status code: {response.status_code}")

    # Fetch driver standings data
    constructors_url = "http://ergast.com/api/f1/current/driverStandings"
    constructors_response = requests.get(constructors_url)

    if constructors_response.status_code == 200:
        xml_constructor_data = constructors_response.content
        constructors_root = ET.fromstring(xml_constructor_data)
        
        StandingsTable = constructors_root.find('mrd:StandingsTable', namespaces)
        if StandingsTable is not None:
            StandingsList = StandingsTable.find('mrd:StandingsList', namespaces)
            if StandingsList is not None:
                driver_elements = StandingsList.findall('mrd:DriverStanding', namespaces)
                # points = driver_elements.find('mrd:Points', namespaces)
                # pointsTable.append(points)
                # print(points)
                for driver in driver_elements:
                    family_name_element = driver.find('mrd:Driver/mrd:FamilyName', namespaces)
                    given_name_element = driver.find('mrd:Driver/mrd:GivenName', namespaces)
                    if family_name_element is not None and given_name_element is not None:
                        full_name = f"{given_name_element.text} {family_name_element.text}"
                        drivers.append(full_name)
    
    else:
        print(f"Failed to fetch standings data. Status code: {constructors_response.status_code}")

    # Prepare combined response
    response_data = {
        'Names': driversNames,
        'Times': drivers_times,
        'Location': sessions_Details[0] if sessions_Details else 'N/A',
        'GridStart': driver_start,
        'Position':'',
        'Session': sessions_Details,
        'DRIVERS': drivers
        # 'Points':pointsTable
    }

    print(drivers)
    return jsonify(response_data)

if __name__ == "__main__":
    app.run(debug=True, port=8080)


#  To run script
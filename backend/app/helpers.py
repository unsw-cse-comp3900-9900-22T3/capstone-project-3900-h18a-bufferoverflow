from app.models import Address

def determine_address_id(address):
    if address is not None:
        address_info = Address.query.filter_by(place=address["place"]).first()
        # check if address already exists
        if address_info is not None:
            return address_info.id
        else:
            # add it to db 
            new_address = Address(address["place"])
            new_address.save()
            return new_address.id

def build_address(address_data):

    # extract city, state and country from address
    city_string = address_data["city"]
    state_string = address_data["state"]
    country_string = address_data["country"]

    city = City(city_string)
    state = State(state_string)
    country = Country(country_string)

    # save them to db
    city.save()
    state.save()
    country.save()

    # add new address
    address = Address(street = address["street"], city_id = city.id, state_id = state.id, country_id = country.id, post_code = address["post_code"])
    address.save()
    return address.id
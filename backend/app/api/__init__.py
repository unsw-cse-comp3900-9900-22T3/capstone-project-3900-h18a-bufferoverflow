from app.api.queries import userQueries, listingQueries, tradeOfferQueries, followQueries, chatQueries, statsQueries
import ariadne


# Create queries
query = ariadne.ObjectType("Query")
query.set_field("listUsers", userQueries.listUsers_resolver)
query.set_field("getUser", userQueries.getUser_resolver)
query.set_field("getListing", listingQueries.getListing_resolver)
query.set_field("getListingsByUser", listingQueries.getListingsByUser_resolver)
query.set_field("defaultFeed", listingQueries.defaultFeed_resolver)
query.set_field("userFeed", listingQueries.userFeed_resolver)
query.set_field("searchListings", listingQueries.searchListings_resolver)
query.set_field("getCategories", listingQueries.getCategories_resolver)
query.set_field("getMessages", chatQueries.getMessages_resolver)
query.set_field("countUnseenMessages", chatQueries.countUnseenMessages_resolver)
query.set_field("getMaterials", listingQueries.getMaterials_resolver)
query.set_field("getTradeOffersByUser", tradeOfferQueries.getTradeOffersByUser_resolver)
query.set_field("getFollowing", followQueries.getFollowing_resolver)
query.set_field("getFollowingList", followQueries.getFollowingList_resolver)
query.set_field("getConversations", chatQueries.getConversations_resolver)
query.set_field("getConversationsForOverview", chatQueries.getConversationsForOverview_resolver)
query.set_field("getListingsInTradeOffer", tradeOfferQueries.getListingsInTradeOffer_resolver)
query.set_field("getUsersInTradeOffer", tradeOfferQueries.getUsersInTradeOffer_resolver)
query.set_field("getUserStats", statsQueries.getUserStats_resolver)
query.set_field("getCommunityStats", statsQueries.getCommunityStats_resolver)


# Create mutations
mutation = ariadne.ObjectType("Mutation")
mutation.set_field("createUser", userQueries.create_user_resolver)
mutation.set_field("updateUser", userQueries.update_user_resolver)
mutation.set_field("deleteUser", userQueries.delete_user_resolver)
mutation.set_field("createListing", listingQueries.create_listing_resolver)
mutation.set_field("updateListing", listingQueries.update_listing_resolver)
mutation.set_field("deleteListing", listingQueries.delete_listing_resolver)
mutation.set_field("createMessage", chatQueries.create_message_resolver)
mutation.set_field("createTradeOffer", tradeOfferQueries.createTradeOffer_resolver)
mutation.set_field("updateTradeOffer", tradeOfferQueries.updateTradeOffer_resolver)
mutation.set_field("deleteTradeOffer", tradeOfferQueries.deleteTradeOffer_resolver)
mutation.set_field("followUser", followQueries.followUser_resolver)
mutation.set_field("unfollowUser", followQueries.unfollowUser_resolver)
mutation.set_field("createConversation", chatQueries.createConversation_resolver)
mutation.set_field("updateConversation", chatQueries.updateConversation_resolver)
mutation.set_field("deleteConversation", chatQueries.deleteConversation_resolver)


# Create schema
type_defs = ariadne.load_schema_from_path("app/api/schema.graphql")
schema = ariadne.make_executable_schema(
    type_defs, query, mutation, ariadne.snake_case_fallback_resolvers
)

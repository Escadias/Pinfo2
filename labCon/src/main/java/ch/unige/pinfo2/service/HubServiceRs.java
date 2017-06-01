package ch.unige.pinfo2.service;

import java.util.List;

import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import ch.unige.pinfo2.dom.Hub;

@Path("/devices/hubs")
public class HubServiceRs {

	@Inject
	private HubService hubService;
	
	@GET
	@Produces("application/json")
	@Path("/getLastState")
	public JsonObject getLastState(@QueryParam("deviceId") String deviceId) {
		Hub hub = hubService.getLastState(deviceId);
		
		JsonBuilderFactory factory = Json.createBuilderFactory(null);
		
		JsonObject jsonHub = factory.createObjectBuilder()
				.add("hub", factory.createObjectBuilder()
						.add("power", hub.getPower().doubleValue())
						.add("onOffStatus", hub.getOnOffStatus().booleanValue()))
				.build();
		
		return jsonHub;
	}

	@GET
	@Produces("application/json")
	@Path("/getStates")
	public JsonObject getStates(@QueryParam("deviceId") String deviceId, @QueryParam("from") Long fromDate,
			@QueryParam("to") Long toDate) {
		List<Hub> hubStates = hubService.getStates(deviceId, fromDate, toDate);
		
		JsonBuilderFactory factory = Json.createBuilderFactory(null);
		
		JsonArrayBuilder jsonHubStatesContentBuilder = factory.createArrayBuilder();
		
		for(Hub h : hubStates) {
			jsonHubStatesContentBuilder.add(factory.createObjectBuilder()
					.add("timestamp", h.getTimestamp().longValue())
					.add("power",h.getPower().doubleValue()));
					
		}
		
		JsonObject jsonHubStates = factory.createObjectBuilder()
				.add("hubStates", jsonHubStatesContentBuilder.build())
				.build();
		
		return jsonHubStates;
	}
}

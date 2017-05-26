package ch.unige.pinfo2.mock;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.enterprise.inject.Alternative;

import ch.unige.pinfo2.dom.Light;
import ch.unige.pinfo2.service.LightService;

@Alternative
public class LightServiceImplMock implements LightService {

	@Override
	public Light getLastState(String deviceId) {
		Random valueGenerator = new Random();
		return new Light(new Long(valueGenerator.nextLong()), new Double(valueGenerator.nextDouble()));
	}
	
	@Override
	public List<Light> getStates(String deviceId, Long from, Long to) {
		Random valueGenerator = new Random();
		
		List<Light> lights = new ArrayList<Light>();
		
		Long timestamp = new Long(from.longValue());
				
		while(timestamp.longValue() < to.longValue()) {
			lights.add(new Light(timestamp, new Double(valueGenerator.nextDouble())));
			timestamp += valueGenerator.nextLong();
		}
		
		return lights;
	}

	@Override
	public Boolean setOnOrOff(String deviceId, String onOrOff) {
		return true;
	}
	
	
}

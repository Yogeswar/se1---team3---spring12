package com.SET3.PhoneGap.Plugin;

import org.json.JSONArray;

import android.location.LocationManager;
import android.provider.Settings;
import android.util.Log;

import com.phonegap.api.Plugin;
import com.phonegap.api.PluginResult;

public class LocationCheck extends Plugin {

    @Override
    public PluginResult execute(String action, JSONArray arg1, String arg2) {
        PluginResult.Status status = PluginResult.Status.OK;
        boolean result = false;
        Log.d(" gpsDetect", "Plugin Called");
        if (action.equals("gpsDetect")) {
            result = detectGPS();        
        }
        else {
            status = PluginResult.Status.INVALID_ACTION;
        }
        return new PluginResult(status, result);
    }
    
   public boolean detectGPS(){
      
       android.content.ContentResolver contentResolver = ctx.getContentResolver();
       boolean gpsStatus = Settings.Secure.isLocationProviderEnabled(contentResolver, LocationManager.GPS_PROVIDER);
       if(gpsStatus){             
          return true;
       }
       else
       {
          return false;
       }
   }
}
	
	



package com.app.service;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class AssetDetectionService {
    private static final Map<String, List<String>> KEYWORDS = new HashMap<>();

    static {
        KEYWORDS.put("stocks", Arrays.asList("stock", "stocks", "shares", "share", "equity"));
        KEYWORDS.put("mutual_funds", Arrays.asList("sip","mutual fund", "mf"));
        KEYWORDS.put("gold", Arrays.asList("gold"));
        KEYWORDS.put("silver", Arrays.asList("silver"));
        KEYWORDS.put("crypto", Arrays.asList("bitcoin", "crypto", "bitc", "eth", "ethereum"));
        KEYWORDS.put("real_estate", Arrays.asList("property","land","real estate"));
        KEYWORDS.put("Debt", Arrays.asList("bond","bonds","fd","ppf"));
    }

    public static String detectAssetType(String text){

        if(text==null || text.isBlank()) return "unknown";

        text = text.toLowerCase().replaceAll("[^a-z0-9 ]"," ");

        Map<String, Integer> scores = new HashMap<>();

        for(Map.Entry<String,List<String>> entry: KEYWORDS.entrySet()){
            String assetType = entry.getKey();
            for(String keyword : entry.getValue()){

                Pattern pattern = Pattern.compile("\\b" + keyword + "\\b");
                // the keyword is not a part of a bigger word ex = cat in category or bat in batch.
                Matcher matcher = pattern.matcher(text);

                if(matcher.find()){
                    scores.put(assetType, scores.getOrDefault(assetType, 0)+1);
                }

            }
        }
        // No match
        if(scores.isEmpty()) return "unknown";

        return Collections.max(scores.entrySet(), Map.Entry.comparingByValue()).getKey();
    }

}

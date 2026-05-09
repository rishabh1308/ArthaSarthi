package com.app.service;

import lombok.extern.slf4j.Slf4j;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
public class AssetDetectionService {

    private static final Map<String, List<String>>
            KEYWORDS = new HashMap<>();

    static {

        KEYWORDS.put(
                "stocks",
                Arrays.asList(
                        "stock",
                        "stocks",
                        "shares",
                        "share",
                        "equity"
                )
        );

        KEYWORDS.put(
                "mutual_funds",
                Arrays.asList(
                        "sip",
                        "mutual fund",
                        "mf"
                )
        );

        KEYWORDS.put(
                "gold",
                Arrays.asList("gold")
        );

        KEYWORDS.put(
                "silver",
                Arrays.asList("silver")
        );

        KEYWORDS.put(
                "crypto",
                Arrays.asList(
                        "bitcoin",
                        "crypto",
                        "bitc",
                        "eth",
                        "ethereum"
                )
        );

        KEYWORDS.put(
                "real_estate",
                Arrays.asList(
                        "property",
                        "land",
                        "real estate"
                )
        );

        KEYWORDS.put(
                "Debt",
                Arrays.asList(
                        "bond",
                        "bonds",
                        "fd",
                        "ppf"
                )
        );
    }

    public static String detectAssetType(
            String text
    ){

        if(text == null || text.isBlank()) {

            log.debug(
                    "Empty or null text received for asset detection"
            );

            return "unknown";
        }

        text = text.toLowerCase();

        Map<String, Integer> scores =
                new HashMap<>();

        for(Map.Entry<String, List<String>> entry
                : KEYWORDS.entrySet()){

            String assetType =
                    entry.getKey();

            for(String keyword
                    : entry.getValue()){

                Pattern pattern =
                        Pattern.compile(
                                "\\b" + keyword + "\\b"
                        );

                Matcher matcher =
                        pattern.matcher(text);

                if(matcher.find()){

                    scores.put(
                            assetType,
                            scores.getOrDefault(
                                    assetType,
                                    0
                            ) + 1
                    );
                }
            }
        }

        // No match found
        if(scores.isEmpty()) {

            log.debug(
                    "No asset type detected for text: {}",
                    text
            );

            return "unknown";
        }

        String detectedAsset =
                Collections.max(
                        scores.entrySet(),
                        Map.Entry.comparingByValue()
                ).getKey();

        log.debug(
                "Detected asset type '{}' for text '{}'",
                detectedAsset,
                text
        );

        return detectedAsset;
    }
}
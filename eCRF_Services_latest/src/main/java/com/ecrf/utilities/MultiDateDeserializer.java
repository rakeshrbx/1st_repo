package com.ecrf.utilities;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Arrays;
import java.util.Date;
import java.util.stream.Collectors;
import java.time.LocalDateTime;

/**
 * https://stackoverflow.com/a/42567051/11152683
 */
public class MultiDateDeserializer extends StdDeserializer<Date> {
    private static final long serialVersionUID = 1L;

    private static final SimpleDateFormat[] DATE_FORMATTERS = new SimpleDateFormat[]{
            new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"),
            new SimpleDateFormat("yyyy-MM-dd")
    };

    public MultiDateDeserializer() {
        this(null);
    }

    public MultiDateDeserializer(Class<?> vc) {
        super(vc);
    }

    @Override
    public Date deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        JsonNode node = jp.getCodec().readTree(jp);
        final String date = node.textValue();

        for (SimpleDateFormat formatter : DATE_FORMATTERS) {
            try {
                return formatter.parse(date); //.toInstant();
            } catch (ParseException e) {
            }
        }
        throw new JsonParseException(jp, "Unparseable date: \"" + date + "\". Supported formats: " +
                Arrays.stream(DATE_FORMATTERS).map(SimpleDateFormat::toPattern).collect(Collectors.joining("; ")));
    }
}

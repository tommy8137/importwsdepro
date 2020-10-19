ALTER TABLE wiprocurement.logs_kafka_finished DROP CONSTRAINT logs_kafka_finished_pkey;
    ALTER TABLE wiprocurement.logs_kafka_finished ADD PRIMARY KEY (topic, partition, "offset");

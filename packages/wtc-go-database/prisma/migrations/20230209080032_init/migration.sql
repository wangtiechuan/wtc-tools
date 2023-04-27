-- DropIndex
DROP INDEX `KlineBian_timestamp_idx` ON `KlineBian`;

-- CreateIndex
CREATE INDEX `KlineBian_symbol_timeframe_timestamp_idx` ON `KlineBian`(`symbol`, `timeframe`, `timestamp`);

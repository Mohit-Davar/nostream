exports.up = async function (knex) {
  return knex.schema
    .raw(
      `CREATE OR REPLACE FUNCTION admit_user(user_pubkey BYTEA, admission_date TIMESTAMP WITHOUT TIME ZONE)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
    user_found BOOLEAN;
BEGIN
    PERFORM ASSERT_SERIALIZED();

    SELECT EXISTS(SELECT 1 FROM "users" WHERE "pubkey" = user_pubkey) INTO user_found;
    IF NOT user_found THEN
        INSERT INTO "users" ("pubkey", "is_admitted", "tos_accepted_at", "updated_at", "created_at")
        VALUES (user_pubkey, true, admission_date, admission_date, admission_date);
    ELSE
        UPDATE "users"
        SET
          "is_admitted" = true,
          "tos_accepted_at" = admission_date,
          "updated_at" = admission_date
        WHERE "pubkey" = user_pubkey;
    END IF;
    RETURN 1;
END;
$$;`)
}

exports.down = function (knex) {
  return knex.schema
    .raw('DROP FUNCTION IF EXISTS admit_user(BYTEA, TIMESTAMP WITHOUT TIME ZONE);')
}

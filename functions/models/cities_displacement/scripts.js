module.exports = {
    create: `
    CREATE TABLE IF NOT EXISTS cities_displacement (
        rowid SERIAL PRIMARY KEY,
        city_id INTEGER NOT NULL,
        city VARCHAR(255) NOT NULL,
        state VARCHAR(2) NOT NULL,
        country VARCHAR(50) NOT NULL,
        time_desc VARCHAR(100) NOT NULL,
        qtd INTEGER NOT NULL,
        avg_time FLOAT NULL,
        percent_above_1h FLOAT NULL,
        sensus_year INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        edited_by VARCHAR(100) DEFAULT 'WEBSERVICE'
    );
    `,
    insert: `
    INSERT INTO cities_displacement (
        city_id,
        city,
        state,
        country,
        time_desc,
        qtd,
        avg_time,
        percent_above_1h,
        sensus_year
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `,
    update: `
    UPDATE cities_displacement
    SET city_id = COALESCE($1, city_id),
        city = COALESCE($2, city),
        state = COALESCE($3, state),
        country = COALESCE($4, country),
        time_desc = COALESCE($5, time_desc),
        qtd = COALESCE($6, qtd),
        avg_time = COALESCE($7, avg_time),
        percent_above_1h = COALESCE($8, percent_above_1h),
        sensus_year = COALESCE($9, sensus_year),
        updated_at = CURRENT_TIMESTAMP,
        edited_by = COALESCE($10, edited_by)
    WHERE rowid = $11;
    `,
    delete: `
    UPDATE cities_displacement
    SET deleted_at = CURRENT_TIMESTAMP,
        edited_by = COALESCE($2, edited_by)
    WHERE rowid = $1;
    `,
    selectAll: `
    SELECT *
    FROM cities_displacement
    `,
};
#!/usr/bin/env bb

(require '[babashka.pods :as pods]
         '[babashka.deps :as deps]
         '[clojure.pprint :as pp]
         '[clojure.tools.cli :as cli]
         '[clojure.java.io :as io]
         '[clojure.string :as string])

(pods/load-pod 'org.babashka/postgresql "0.0.1")
(deps/add-deps '{:deps {honeysql/honeysql {:mvn/version "1.0.444"}}})

(require '[pod.babashka.postgresql :as pg]
         '[honeysql.core :as hsql]
         '[honeysql.helpers :as hsqlh])



(def db-url
  (System/getenv "DATABASE_URL"))

(defn heroku-url-spec [db-url]
  (let [[_ user password host port db] (re-matches #"postgres://(?:(.+):(.*)@)?([^:]+)(?::(\d+))?/(.+)" db-url)]
    {:dbtype "postgresql"
     :host host
     :dbname db
     :port (or port 80)
     :user user
     :password password}))

    

(defn execute!
  [query-or-command]
  (execute-sql! (hsql/format query-or-command)))


(defn insert!
  [table values]
  (execute! {:insert-into table
             :values values}))



;; Define a function to execute SQL against the database
(defn execute-sql! [sql]
  (println "Executing SQL:" sql)
  (pg/execute!
    (heroku-url-spec (System/getenv "DATABASE_URL"))
    sql))

;; Define a function to check if a table exists
(defn table-exists? [table-name]
  (-> (execute-sql! ["SELECT to_regclass(?)" table-name])
      first
      boolean))

;; Define a function to insert a record into the migrations table
(defn remember-tx-migration! [name]
  (execute-sql! ["INSERT INTO migrations (name, completed_at) VALUES (?, ?)" name (System/currentTimeMillis)]))

;; Define a function to process a migration file
(defn process-mig-file! [file-path]
  (let [file-content (slurp (io/file file-path))]
    (println "Processing migration file:" file-path)
    (execute-sql! [file-content])
    (remember-tx-migration! (io/file file-path))))

;; Now, we check if the user table exists, and if not, run the migration file for it
(when-not (table-exists? "user")
  (process-mig-file! "server/postgres/migrations/seed/000001_add_example_user_admin.sql")
  (remember-tx-migration! "000001_add_example_user_admin.sql"))



import { isUndefined } from "@/utils"

class ConfigService {
    public readonly appName = "Katan"
    public readonly appVersion = this.value("$VITE_KATAN_VERSION")
    public readonly appWebsite = this.value("$VITE_KATAN_WEBSITE")
    public readonly apiUrl = this.value("$VITE_KATAN_API")
    public readonly gatewayUrl = this.value("$VITE_KATAN_GATEWAY")
    public readonly gitCommit = this.value("$VITE_GIT_COMMIT")
    public readonly gitBranch = this.value("$VITE_GIT_BRANCH")
    public readonly orgName = this.value("$VITE_ORG_NAME")

    /**
	 * Returns a string containing the name of the application, the current
	 * version, the SHA of the build commit and the branch of the current build.
	 */
    public toVersionInfoString(): string {
        return `${this.appName} v${this.appVersion} (build ${this.gitCommit} @ ${this.gitBranch})`
    }

    /**
	 * Returns a environment variable key value.
	 *
	 * If the current environment is of development, it returns the value of
	 * the key present in the environment.
	 *
	 * If it is a dynamic key (its initial value can be changed) it must be
	 * prefixed with `$` to be changed during the construction phase of the
	 * application by the respective value.
	 * @param {string} key - The environment key.
	 */
    public value(key: string): string {
        const envKey = key.indexOf("$") === -1 ? key : key.substring(1)
        const value = import.meta.env[envKey] || envKey

        if (import.meta.env.NODE_ENV === "development") return value!

        if (isUndefined(value)) throw Error(`Environment var not found: ${envKey}`)

        // key will be replaced in build stage
        return value || envKey
    }
}

export default new ConfigService()

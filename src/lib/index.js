"use strict";
import Auth from "./auth/index";
import Database from "./database/index";
import Settings from "./settings/index";
import Utility from "./utility/index";
import credentials from "../credentials";

const AS_SDK = {
    Auth,
    Database,
    Settings,
    Utility
};

AS_SDK.Settings.init(credentials);

export default AS_SDK;

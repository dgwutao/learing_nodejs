/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const myprotocol = $root.myprotocol = (() => {

    /**
     * Namespace myprotocol.
     * @exports myprotocol
     * @namespace
     */
    const myprotocol = {};

    /**
     * MessageType enum.
     * @name myprotocol.MessageType
     * @enum {number}
     * @property {number} UNKNOWN=0 UNKNOWN value
     * @property {number} LOGIN_REQUEST=1 LOGIN_REQUEST value
     * @property {number} LOGIN_RESPONSE=2 LOGIN_RESPONSE value
     * @property {number} CHAT_MESSAGE=3 CHAT_MESSAGE value
     * @property {number} HEARTBEAT=4 HEARTBEAT value
     */
    myprotocol.MessageType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN"] = 0;
        values[valuesById[1] = "LOGIN_REQUEST"] = 1;
        values[valuesById[2] = "LOGIN_RESPONSE"] = 2;
        values[valuesById[3] = "CHAT_MESSAGE"] = 3;
        values[valuesById[4] = "HEARTBEAT"] = 4;
        return values;
    })();

    myprotocol.Envelope = (function() {

        /**
         * Properties of an Envelope.
         * @memberof myprotocol
         * @interface IEnvelope
         * @property {myprotocol.MessageType|null} [type] Envelope type
         * @property {Uint8Array|null} [payload] Envelope payload
         * @property {number|Long|null} [sequenceId] Envelope sequenceId
         * @property {string|null} [sessionId] Envelope sessionId
         */

        /**
         * Constructs a new Envelope.
         * @memberof myprotocol
         * @classdesc Represents an Envelope.
         * @implements IEnvelope
         * @constructor
         * @param {myprotocol.IEnvelope=} [properties] Properties to set
         */
        function Envelope(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Envelope type.
         * @member {myprotocol.MessageType} type
         * @memberof myprotocol.Envelope
         * @instance
         */
        Envelope.prototype.type = 0;

        /**
         * Envelope payload.
         * @member {Uint8Array} payload
         * @memberof myprotocol.Envelope
         * @instance
         */
        Envelope.prototype.payload = $util.newBuffer([]);

        /**
         * Envelope sequenceId.
         * @member {number|Long} sequenceId
         * @memberof myprotocol.Envelope
         * @instance
         */
        Envelope.prototype.sequenceId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Envelope sessionId.
         * @member {string} sessionId
         * @memberof myprotocol.Envelope
         * @instance
         */
        Envelope.prototype.sessionId = "";

        /**
         * Creates a new Envelope instance using the specified properties.
         * @function create
         * @memberof myprotocol.Envelope
         * @static
         * @param {myprotocol.IEnvelope=} [properties] Properties to set
         * @returns {myprotocol.Envelope} Envelope instance
         */
        Envelope.create = function create(properties) {
            return new Envelope(properties);
        };

        /**
         * Encodes the specified Envelope message. Does not implicitly {@link myprotocol.Envelope.verify|verify} messages.
         * @function encode
         * @memberof myprotocol.Envelope
         * @static
         * @param {myprotocol.IEnvelope} message Envelope message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Envelope.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.payload != null && Object.hasOwnProperty.call(message, "payload"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.payload);
            if (message.sequenceId != null && Object.hasOwnProperty.call(message, "sequenceId"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.sequenceId);
            if (message.sessionId != null && Object.hasOwnProperty.call(message, "sessionId"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.sessionId);
            return writer;
        };

        /**
         * Encodes the specified Envelope message, length delimited. Does not implicitly {@link myprotocol.Envelope.verify|verify} messages.
         * @function encodeDelimited
         * @memberof myprotocol.Envelope
         * @static
         * @param {myprotocol.IEnvelope} message Envelope message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Envelope.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Envelope message from the specified reader or buffer.
         * @function decode
         * @memberof myprotocol.Envelope
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {myprotocol.Envelope} Envelope
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Envelope.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.myprotocol.Envelope();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.int32();
                        break;
                    }
                case 2: {
                        message.payload = reader.bytes();
                        break;
                    }
                case 3: {
                        message.sequenceId = reader.uint64();
                        break;
                    }
                case 4: {
                        message.sessionId = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Envelope message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof myprotocol.Envelope
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {myprotocol.Envelope} Envelope
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Envelope.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Envelope message.
         * @function verify
         * @memberof myprotocol.Envelope
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Envelope.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.payload != null && message.hasOwnProperty("payload"))
                if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                    return "payload: buffer expected";
            if (message.sequenceId != null && message.hasOwnProperty("sequenceId"))
                if (!$util.isInteger(message.sequenceId) && !(message.sequenceId && $util.isInteger(message.sequenceId.low) && $util.isInteger(message.sequenceId.high)))
                    return "sequenceId: integer|Long expected";
            if (message.sessionId != null && message.hasOwnProperty("sessionId"))
                if (!$util.isString(message.sessionId))
                    return "sessionId: string expected";
            return null;
        };

        /**
         * Creates an Envelope message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof myprotocol.Envelope
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {myprotocol.Envelope} Envelope
         */
        Envelope.fromObject = function fromObject(object) {
            if (object instanceof $root.myprotocol.Envelope)
                return object;
            let message = new $root.myprotocol.Envelope();
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "UNKNOWN":
            case 0:
                message.type = 0;
                break;
            case "LOGIN_REQUEST":
            case 1:
                message.type = 1;
                break;
            case "LOGIN_RESPONSE":
            case 2:
                message.type = 2;
                break;
            case "CHAT_MESSAGE":
            case 3:
                message.type = 3;
                break;
            case "HEARTBEAT":
            case 4:
                message.type = 4;
                break;
            }
            if (object.payload != null)
                if (typeof object.payload === "string")
                    $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
                else if (object.payload.length >= 0)
                    message.payload = object.payload;
            if (object.sequenceId != null)
                if ($util.Long)
                    (message.sequenceId = $util.Long.fromValue(object.sequenceId)).unsigned = true;
                else if (typeof object.sequenceId === "string")
                    message.sequenceId = parseInt(object.sequenceId, 10);
                else if (typeof object.sequenceId === "number")
                    message.sequenceId = object.sequenceId;
                else if (typeof object.sequenceId === "object")
                    message.sequenceId = new $util.LongBits(object.sequenceId.low >>> 0, object.sequenceId.high >>> 0).toNumber(true);
            if (object.sessionId != null)
                message.sessionId = String(object.sessionId);
            return message;
        };

        /**
         * Creates a plain object from an Envelope message. Also converts values to other types if specified.
         * @function toObject
         * @memberof myprotocol.Envelope
         * @static
         * @param {myprotocol.Envelope} message Envelope
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Envelope.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "UNKNOWN" : 0;
                if (options.bytes === String)
                    object.payload = "";
                else {
                    object.payload = [];
                    if (options.bytes !== Array)
                        object.payload = $util.newBuffer(object.payload);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.sequenceId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.sequenceId = options.longs === String ? "0" : 0;
                object.sessionId = "";
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.myprotocol.MessageType[message.type] === undefined ? message.type : $root.myprotocol.MessageType[message.type] : message.type;
            if (message.payload != null && message.hasOwnProperty("payload"))
                object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
            if (message.sequenceId != null && message.hasOwnProperty("sequenceId"))
                if (typeof message.sequenceId === "number")
                    object.sequenceId = options.longs === String ? String(message.sequenceId) : message.sequenceId;
                else
                    object.sequenceId = options.longs === String ? $util.Long.prototype.toString.call(message.sequenceId) : options.longs === Number ? new $util.LongBits(message.sequenceId.low >>> 0, message.sequenceId.high >>> 0).toNumber(true) : message.sequenceId;
            if (message.sessionId != null && message.hasOwnProperty("sessionId"))
                object.sessionId = message.sessionId;
            return object;
        };

        /**
         * Converts this Envelope to JSON.
         * @function toJSON
         * @memberof myprotocol.Envelope
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Envelope.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Envelope
         * @function getTypeUrl
         * @memberof myprotocol.Envelope
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Envelope.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/myprotocol.Envelope";
        };

        return Envelope;
    })();

    return myprotocol;
})();

export { $root as default };
